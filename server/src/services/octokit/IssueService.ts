import { Octokit } from 'octokit';
import { IIssueService, SendIssueDTO } from '../IIssueService';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

class IssueService implements IIssueService {
  async sendIssue({
    owner,
    repo,
    title,
    body,
    labels,
    milestone,
  }: SendIssueDTO) {
    await octokit.request('POST /repos/{owner}/{repo}/issues', {
      owner: owner,
      repo: repo,
      title: title,
      body: body,
      assignees: ['azevgabriel'],
      milestone: milestone,
      labels: labels,
    });
  }
}

export { IssueService };
