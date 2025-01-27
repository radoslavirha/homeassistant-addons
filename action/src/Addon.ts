import core from '@actions/core';
import exec from '@actions/exec';
import glob from '@actions/glob';
import io from '@actions/io';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import semver from 'semver';
import { RepositoryAddonConfiguration } from './types/RepositoryConfiguration.js';
import { CHANGELOG_FILE, CONFIG_FILE, CONFIG_FILES, DOCS_FILE, README_FILE } from './Constant.js';
import { Github } from './Github.js';
import { AddonConfiguration } from './types/AddonConfiguration.js';
import { GetResponseDataTypeFromEndpointMethod } from '@octokit/types';

export class Addon {
    private github: Github;
    private currentCommit!: GetResponseDataTypeFromEndpointMethod<typeof this.github.client.git.getCommit>;
    private currentConfiguration!: AddonConfiguration;
    private latestRelease!: GetResponseDataTypeFromEndpointMethod<typeof this.github.client.repos.getRelease>; // single release
    private latestCommit!: GetResponseDataTypeFromEndpointMethod<typeof this.github.client.git.getCommit>;
    private latestConfiguration!: AddonConfiguration;
    private remoteConfigurationFile!: AddonConfiguration;

    constructor(
        private token: string,
        private localPath: string,
        private target: string,
        private config: RepositoryAddonConfiguration
    ) {
        this.github = new Github(config.repository, token);
    }

    public async update(): Promise<void> {
        core.info(`Updating ${this.target} addon.`);
        await this.loadConfiguration();
        await this.loadLatestInfo();

        // if (this.needsUpdate()) {
            await this.removeFiles();
            await this.copyFiles();
        // }
    }

    /**
     * Loads the addon configuration from the addons repository.
     */
    private async loadConfiguration(): Promise<void> {
        core.info(`Loading local configuration for ${this.target} addon.`);
        let configFile: string | undefined;

        for (const file of CONFIG_FILES) {
            const globber = await glob.create(path.join(this.localPath, this.target, file));
            const config = await globber.glob();
            if (config.length > 0) {
                core.info(`Configuration file ${file} found for ${this.target} addon.`);
                configFile = config[0];
                continue;
            }
        }

        if (!configFile) {
            core.setFailed(`Configuration file not found for ${this.target} addon.`);
        }
        
        core.info(`Parsing configuration for ${this.target} addon.`);
        let configuration: AddonConfiguration;

        try {
            const content = await fs.promises.readFile(configFile!, 'utf-8');
            if (configFile!.endsWith('.json')) {
                configuration = JSON.parse(content);
            } else {
                configuration = yaml.load(content) as AddonConfiguration;
            }
        } catch (error) {
            core.setFailed(`Parsing configuration for ${this.target} addon failed. Error: ${error}`);
        }

        this.currentConfiguration = this.extractConfiguration(configuration!);

        this.currentCommit = await this.github.getCommitFromTag(`${this.target}@${this.currentConfiguration.version}`);

        core.info(`Current version: ${this.currentConfiguration.version}.`);
    }

    private async loadLatestInfo(): Promise<void> {
        const releases = await this.github.getReleases(this.target);
        this.latestRelease = releases[0];
        this.latestCommit = await this.github.getCommitFromTag(this.latestRelease.tag_name);

        core.info(`Loading remote configuration for ${this.target} addon.`);

        for (const file of CONFIG_FILES) {
            try {
                const config = await this.github.getContent(`${this.config.target}/${file}`, this.latestCommit.sha);
                if (file!.endsWith('.json')) {
                    this.remoteConfigurationFile = JSON.parse(config);
                } else {
                    this.remoteConfigurationFile = yaml.load(config) as AddonConfiguration;
                }
                break;
            } catch (error) {
                continue;
            }
        }

        if (!this.remoteConfigurationFile) {
            core.setFailed(`Remote configuration file not found for ${this.target} addon.`);
        }

        this.latestConfiguration = this.extractConfiguration(this.remoteConfigurationFile);

        core.info(`Latest version: ${this.latestConfiguration.version}.`);
    }

    private extractConfiguration(configuration: AddonConfiguration): AddonConfiguration {
        return {
            version: semver.valid(configuration.version)!,
            name: configuration.name,
            description: configuration.description,
            slug: configuration.slug,
            url: configuration.url,
            arch: configuration.arch
        };
    }

    private needsUpdate(): boolean {
        if (semver.gt(this.latestConfiguration.version, this.currentConfiguration.version)) {
            core.info(`Addon ${this.target} needs update due to newer version.`);
            return true;
        } else if (this.currentCommit.sha !== this.latestCommit.sha) {
            core.info(`Addon ${this.target} needs update due to different commit sha.`);
            return true;
        }
        return false
    }

    private async removeFiles(): Promise<void> {
        core.info(`Removing files for ${this.target} addon.`);
        for (const file of CONFIG_FILES) {
            try {
                await io.rmRF(path.join(this.localPath, this.target, file));   
            } catch (error) {
                core.warning(`Failed to remove ${file} for ${this.target} addon.`);
            }
        }
        try {
            await io.rmRF(path.join(this.localPath, this.target, CHANGELOG_FILE));
        } catch (error) {
            core.warning(`Failed to remove ${CHANGELOG_FILE} for ${this.target} addon.`);
        }
        try {
            await io.rmRF(path.join(this.localPath, this.target, DOCS_FILE));
        } catch (error) {
            core.warning(`Failed to remove ${DOCS_FILE} for ${this.target} addon.`);
        }
        try {
            await io.rmRF(path.join(this.localPath, this.target, README_FILE));
        } catch (error) {
            core.warning(`Failed to remove ${README_FILE} for ${this.target} addon.`);
        }
        core.info(`Files removed for ${this.target} addon.`);
    }

    private async copyFiles(): Promise<void> {
        core.info(`Copying files for ${this.target} addon.`);
        try {
            await fs.promises.writeFile(
                path.join(this.localPath, this.target, CONFIG_FILE),
                JSON.stringify(this.remoteConfigurationFile, null, 2),
                'utf-8'
            );
        } catch (error) {
            core.setFailed(`Failed to write configuration file for ${this.target} addon. Error: ${error}`);
        }

        for (const file of [CHANGELOG_FILE, DOCS_FILE, README_FILE]) {
            try {
                const content = await this.github.getContent(`${this.config.target}/${file}`, this.latestCommit.sha);
                await fs.promises.writeFile(
                    path.join(this.localPath, this.target, file),
                    content,
                    'utf-8'
                );
            } catch (error) {
                core.setFailed(`Failed to write ${file} for ${this.target} addon. Error: ${error}`);
            }
        }
        core.info(`Files copied for ${this.target} addon.`);
    }
}