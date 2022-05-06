import { Feedback } from '@prisma/client';

export interface CreateFeedbackDTO {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface IFeedbacksRepository {
  create: (data: CreateFeedbackDTO) => Promise<Feedback>;
}
