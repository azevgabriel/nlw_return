import express from 'express';

import { FeedbacksRepository } from './repositories/prisma/FeedbacksRepository';
import { MailService } from './services/nodemailer/MailService';
import { SubmitFeedbackUseCase } from './useCases/SubmitFeedbackUseCase';

const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  if (!comment || !type)
    return res
      .status(400)
      .json({ actiom: false, message: 'Comment and type are required' });

  if (screenshot && !screenshot.match(/^data:image\/(png|jpeg);base64,/))
    return res
      .status(400)
      .json({ actiom: false, message: 'Screenshot is not valid' });

  const prismaFeedbackRepository = new FeedbacksRepository();
  const nodemailerMailService = new MailService();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbackRepository,
    nodemailerMailService
  );

  const feedback = await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  });

  res.status(201).json({ actiom: true, data: feedback });
});

export { routes };
