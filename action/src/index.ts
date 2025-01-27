import core from '@actions/core';
import { PATH_REPO_UPDATER } from './Constant.js';
import { Repository } from './Repository.js';

try {
    const repository = new Repository(
        process.env.GITHUB_REPOSITORY!,
        core.getInput('TOKEN'),
        PATH_REPO_UPDATER
    );

    await repository.update(core.getInput('ADDON'), core.getBooleanInput('FORCE'));
} catch (error) {
    core.setFailed(`Action failed with error ${error}`);
}