import core from '@actions/core';
import yaml from 'js-yaml';
import { RepositoryAddonConfiguration, RepositoryConfiguration } from './types/RepositoryConfiguration.js';
import { ADDONS_YAML, CHANNEL_BETA, CHANNEL_EDGE, CHANNEL_STABLE, CHANNELS } from './Constant.js';
import { Github } from './Github.js';
import { Addon } from './Addon.js';

export class Repository {
    private github: Github;
    private channel!: typeof CHANNEL_STABLE | typeof CHANNEL_BETA | typeof CHANNEL_EDGE;
    private addons: Addon[] = [];

    constructor(
        private repositoryWithOwner: string,
        private token: string,
        private localPath: string
    ) {
        this.github = new Github(repositoryWithOwner, token);
    }

    public async update(addon?: string, force: boolean = false): Promise<void> {
        core.info('Cloning addons repository.');
        await this.github.clone(this.localPath);
        core.info(`Fetching ${ADDONS_YAML} file.`);
        const file = await this.github.getContent(ADDONS_YAML);
        this.extractConfig(yaml.load(file) as RepositoryConfiguration, addon, force);
        await this.updateAddons();
        await this.commitChanges();
    }

    private extractConfig(config: RepositoryConfiguration, addon?: string, force: boolean = false): void {
        core.info(`Extracting ${ADDONS_YAML} file.`);
        if (!CHANNELS.includes(config.channel)) {
            core.setFailed(`'Channel '${config.channel}' is not a valid channel identifier.`);
        }
        this.channel = config.channel;

        if (force) {
            core.notice('Forced update of all addons.');
            for (const target in config.addons) {
                this.addons.push(this.setAddon(target, config));
            }
        } else if (addon) {
            this.addons.push(this.setAddon(addon, config));
        } else {
            core.setFailed('No addon specified. Skipping update.');
        }
    }

    private setAddon(target: string, config: RepositoryConfiguration): Addon {
        if (!config.addons.hasOwnProperty(target)) {
            core.setFailed(`Addon ${target} not found in the configuration.`);
        }

        core.info(`Preparing ${target} addon for update.`);
        return new Addon(this.token, this.localPath, target, config.addons[target] as RepositoryAddonConfiguration);
    }

    private async updateAddons(): Promise<void> {
        for (const addon of this.addons) {
            await addon.update();
        }
    }

    private async commitChanges(): Promise<void> {
        core.info('Committing changes.');
        await this.github.commitAndPush();
    }
}