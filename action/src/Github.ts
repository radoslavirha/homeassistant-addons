import core from '@actions/core';
import io from '@actions/io';
import { Octokit } from '@octokit/rest';
import { GetResponseDataTypeFromEndpointMethod } from '@octokit/types';
import { simpleGit, SimpleGit } from 'simple-git';

export class Github {
    public get client(): Octokit {
        return this.octokit;
    }
    private octokit: Octokit;
    private owner: string;
    private repository: string;
    private git?: SimpleGit;

    constructor (repositoryWithOwner: string, private token: string) {
        this.octokit = new Octokit({
            auth: token,
        });
        this.owner = repositoryWithOwner.split('/')[0];
        this.repository = repositoryWithOwner.split('/')[1];
    }

    public async clone(localPath: string): Promise<void> {
        await io.mkdirP(localPath);
        this.git = simpleGit()
        const repoUrl = `https://${this.token}@github.com/${this.owner}/${this.repository}.git`;
        await this.git.clone(repoUrl, localPath)
        await this.git.cwd({ path: localPath, root: true });
        await this.git.addConfig('user.name', 'Addons repository updater')
        await this.git.addConfig('user.email', 'repository-updater@irha.sk');
    }

    public async commitAndPush(): Promise<void> {
        if (!this.git) {
            core.setFailed('Git is not initialized.');
            return;
        }
        await this.git.add('./*');
        await this.git.commit('Update addons');
        await this.git.push();
    }

    public async getContent(path: string, ref?: string): Promise<string> {
        try {
            const { data } = await this.client.repos.getContent({
                owner: this.owner,
                repo: this.repository,
                path: path,
                ref: ref
              });
    
            if (data && 'content' in data) {
                return Buffer.from(data.content, 'base64').toString('utf-8'); 
            } else {
                throw new Error('File not found or is a directory.');
            }            
        } catch (error) {
            // Hnadle error somewhere else, sometimes we need to try to fetch multilpe files, no need to block whole action
            core.error(`Failed to get content: ${(error as Error).message}`);
            throw error; 
        }
    }

    public async getCommitFromTag(tag: string): Promise<GetResponseDataTypeFromEndpointMethod<typeof this.octokit.git.getCommit>> {
        try {
            const gitRef = await this.client.git.getRef({
                owner: this.owner,
                repo: this.repository,
                ref: `tags/${tag}`
            });
            const gitTag = await this.client.git.getTag({
                owner: this.owner,
                repo: this.repository,
                tag_sha: gitRef.data.object.sha
            });
            const gitCommit = await this.client.git.getCommit({
                owner: this.owner,
                repo: this.repository,
                commit_sha: gitTag.data.object.sha
            });
            return gitCommit.data;
        } catch (error) {
            core.setFailed(`Failed to get commit for ${tag} tag: ${(error as Error).message}`);
            throw error; 
        }
    }

    public async getReleases(addon: string): Promise<GetResponseDataTypeFromEndpointMethod<typeof this.octokit.repos.listReleases>> {
        try {
            const releases = await this.client.repos.listReleases({
                owner: this.owner,
                repo: this.repository
            });
            return releases.data
                .filter((release) =>
                    release.tag_name.startsWith(addon) &&
                    !release.draft &&
                    !release.prerelease
                )
                .sort((a, b) => new Date(b.published_at!).getTime() - new Date(a.published_at!).getTime());
        } catch (error) {
            core.setFailed(`Failed to get releases for ${addon} addon: ${(error as Error).message}`);
            throw error; 
        }
    }
}