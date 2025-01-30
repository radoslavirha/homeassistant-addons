import yaml from 'js-yaml';

export class Utils {
    public static parseJSON<T>(content: string, filename: string): T {
        try {
            return JSON.parse(content) as T
        } catch (error) {
            throw new Error(`Failed to parse ${filename} JSON: ${error}`);
        }
    }

    public static parseYaml<T>(content: string, filename: string): T {
        try {
            return yaml.load(content) as T
        } catch (error) {
            throw new Error(`Failed to parse ${filename} yaml: ${error}`);
        }
    }
}