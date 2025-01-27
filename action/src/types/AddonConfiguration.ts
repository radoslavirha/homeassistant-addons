export interface AddonConfiguration {
    version: string;
    name: string;
    description: string;
    slug: string;
    url: string;
    arch: ('aarch64' | 'amd64' | 'armv7' | 'i386' | 'armhf')[];
}