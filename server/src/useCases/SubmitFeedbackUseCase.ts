import { Feedback } from '@prisma/client';
import { IFeedbacksRepository } from '../repositories/IFeedbacksRepository';
import { IMailService } from '../services/IMailService';

interface IRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: IFeedbacksRepository,
    private mailService: IMailService
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
    });

    return feedback;
  }
}
