import { Feedback } from '@prisma/client';
import { IFeedbacksRepository } from '../repositories/IFeedbacksRepository';
import { IIssueService, iLabels } from '../services/IIssueService';
import { IMailService } from '../services/IMailService';
import { IBucketService } from '../services/IBucketService';

interface IRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: IFeedbacksRepository,
    private mailService: IMailService,
    private issueService: IIssueService,
    private bucketService: IBucketService
  ) {}

  async execute(data: IRequest): Promise<Feedback> {
    const { comment, screenshot, type } = data;

    if (!comment || !type) throw new Error('Comment and type are required');

    if (screenshot && !screenshot.match(/^data:image\/(png|jpeg);base64,/))
      throw new Error('Screenshot is not valid');

    await this.mailService.sendMail({
      type,
      comment,
      screenshot,
    });

    let uriS3Image: string | null = null;

    if (screenshot)
      uriS3Image = await this.bucketService.sendImage({
        bucketName: process.env.AWS_BUCKET_NAME
          ? process.env.AWS_BUCKET_NAME
          : '',
        screenshot: screenshot,
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

    const feedback = await this.feedbacksRepository.create({
      comment,
      screenshot: uriS3Image ? uriS3Image : '',
      type,
    });

    await this.issueService.sendIssue({
      owner: 'azevgabriel',
      repo: 'nlw_return',
      title: `Feedback: ${type}`,
      body: `**Author: Our clients** <br/> _"${comment}"_  ${
        uriS3Image
          ? `<br/> This's image issue: [Click here](${uriS3Image})`
          : ''
      }`,
      labels: labelsContructor,
    });

    return feedback;
  }
}
