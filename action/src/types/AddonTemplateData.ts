import { AddonConfiguration } from "./AddonConfiguration.js";

export interface AddonTemplateData extends AddonConfiguration {
    repository: string;
    target: string;
}