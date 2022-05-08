export type iLabels = 'bug' | 'enhancement' | 'question';

export interface SendIssueDTO {
  owner: string;
  repo: string;
  labels: iLabels[];
  title: string;
  body?: string;
  milestone?: string | number | null;
}

export interface IIssueService {
  sendIssue: (data: SendIssueDTO) => Promise<void>;
}
