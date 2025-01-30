import { CHANNEL_BETA, CHANNEL_EDGE, CHANNEL_STABLE } from "../Constant.js";
import { AddonTemplateData } from "./AddonTemplateData.js";

export interface RepositoryTemplateData {
    repository: string;
    channel: typeof CHANNEL_STABLE | typeof CHANNEL_BETA | typeof CHANNEL_EDGE;
    addons: AddonTemplateData[];
    archs: string[];
}