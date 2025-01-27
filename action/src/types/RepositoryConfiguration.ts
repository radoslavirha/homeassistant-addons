import {CHANNEL_STABLE, CHANNEL_BETA, CHANNEL_EDGE} from '../Constant.js';

export interface RepositoryAddonConfiguration {
    repository: string;
    target: string;
    image: string; 
}

export interface RepositoryConfiguration {
    channel: typeof CHANNEL_STABLE | typeof CHANNEL_BETA | typeof CHANNEL_EDGE;
    addons: {
        [target: string]: RepositoryAddonConfiguration
    }
}