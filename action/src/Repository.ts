import core from '@actions/core';
import fs from 'fs';
import Handlebars from 'handlebars';
import path from 'path';
import { RepositoryAddonConfiguration, RepositoryConfiguration } from './types/RepositoryConfiguration.js';
import { ADDONS_YAML, CHANNEL_BETA, CHANNEL_EDGE, CHANNEL_STABLE, CHANNELS } from './Constant.js';
import { Github } from './Github.js';
import { Addon } from './Addon.js';
import { Utils } from './Utils.js';
import { RepositoryTemplateData } from './types/RepositoryTemplateData.js';

Handlebars.registerHelper('ifIn', function(elem, list, options) {
    if (list && list.indexOf(elem) > -1) {
        // @ts-ignore
        return options.fn(this);
    }
    // @ts-ignore
    return options.inverse(this);
});

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
        this.extractConfig(Utils.parseYaml<RepositoryConfiguration>(file, ADDONS_YAML), addon, force);
        await this.updateAddons();
        await this.generateReadme();
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

    private async generateReadme(): Promise<void> {
        const templateData = await this.getTemplateData();

        const readmeTemplate = await fs.promises.readFile(path.join(this.localPath, '.README.hbs'), 'utf8');

        const template = Handlebars.compile(readmeTemplate);
        console.log(templateData);
        const result = template(templateData);
    
        await fs.promises.writeFile(path.join(this.localPath, 'README.md'), result);
    }

    private async getTemplateData(): Promise<RepositoryTemplateData> {
        const templateData: RepositoryTemplateData = {
            repository: this.repositoryWithOwner,
            channel: this.channel,
            addons: [],
            archs: ['aarch64', 'amd64', 'armhf', 'armv7', 'i386']
        };

        for (const addon of this.addons) {
            templateData.addons.push(
                await addon.getTemplateData()
            );
        }

        return Promise.resolve(templateData);
    }

    private async commitChanges(): Promise<void> {
        core.info('Committing changes.');
        await this.github.commitAndPush();
    }
}