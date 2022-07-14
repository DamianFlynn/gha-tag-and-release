const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
  try {
    const token = core.getInput('token', { required: true });
    const commit = core.getInput('commit') || github.context.sha;
    console.log(`commit ${commit}!`);
    const tagName = core.getInput('tag_name', { required: true });
    console.log(`tagName ${tagName}!`);
    const releaseName = core.getInput('release_name') || tagName;
    console.log(`releaseName ${releaseName}!`);
    const body = core.getInput('body');
    console.log(`body ${body}!`);
    const draft = core.getInput('draft') === 'true';
    const prerelease = core.getInput('prerelease') === 'true';
  
    
    //const github = new GitHub(process.env.GITHUB_TOKEN);
    const octokit = new github.getOctokit(token);
    console.log(`owner ${github.context.repo.owner}!`);
    console.log(`repo ${github.context.repo.repo}!`);
    
    const r = await octokit.rest.repos.createRelease({
    //const r = await github.repos.createRelease({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      tag_name: tagName,
      target_commitish: commit,
      name: releaseName,
      body,
      draft,
      prerelease
    });
  
    console.log(`result ${r}!`);

    core.setOutput('id', r.data.id.toString());
    console.log(`id ${r.data.id}!`);
    core.setOutput('html_url', r.data.html_url);
    console.log(`html_url ${r.data.html_url}!`);
    core.setOutput('upload_url', r.data.upload_url);
    console.log(`upload_url' ${r.data.upload_url}!`);
    core.setOutput('repo', github.context.repo.repo);

  } catch (error) {
    core.setFailed(error.message);
  }
}

// Call the main function to run the action
main();






