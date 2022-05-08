import { Feedback } from '@prisma/client';
import { IFeedbacksRepository } from '../repositories/IFeedbacksRepository';
import { IIssueService, iLabels } from '../services/IIssueService';
import { IMailService } from '../services/IMailService';

interface IRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: IFeedbacksRepository,
    private mailService: IMailService,
    private issueService: IIssueService
  ) {}

  async execute(data: IRequest): Promise<Feedback> {
    const { comment, screenshot, type } = data;

    if (!comment || !type) throw new Error('Comment and type are required');

    if (screenshot && !screenshot.match(/^data:image\/(png|jpeg);base64,/))
      throw new Error('Screenshot is not valid');

    const feedback = await this.feedbacksRepository.create({
      comment,
      screenshot,
      type,
    });

    await this.mailService.sendMail({
      type,
      comment,
      screenshot,
    });

    let labelsContructor: iLabels[] = [];

    switch (type) {
      case 'bug':
        labelsContructor = ['bug'];
        break;
      case 'feature':
        labelsContructor = ['enhancement'];
        break;
      case 'suggestion':
        labelsContructor = ['question'];
        break;
      default:
        labelsContructor = [];
        break;
    }

    await this.issueService.sendIssue({
      owner: 'azevgabriel',
      repo: 'nlw_return',
      title: `${labelsContructor} Feedback by Client`,
      body: `Autor: Anônimo \n\n ${comment} \n\n ${
        screenshot && `![Screenshot Image](${screenshot})`
      }`,
      labels: labelsContructor,
    });

    return feedback;
  }
}
