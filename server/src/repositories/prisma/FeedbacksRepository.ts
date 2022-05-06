import {
  CreateFeedbackDTO,
  IFeedbacksRepository,
} from '../IFeedbacksRepository';

import { prisma } from '../../prisma';

export class FeedbacksRepository implements IFeedbacksRepository {
  async create({ comment, screenshot, type }: CreateFeedbackDTO) {
    const feedback = await prisma.feedback.create({
      data: {
        comment,
        screenshot,
        type,
      },
    });

    return feedback;
  }
}
