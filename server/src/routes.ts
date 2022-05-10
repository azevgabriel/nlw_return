import express from 'express';

import { FeedbacksRepository } from './repositories/prisma/FeedbacksRepository';
import { BucketService } from './services/awsS3/BucketService';
import { MailService } from './services/nodemailer/MailService';
import { IssueService } from './services/octokit/IssueService';
import { SubmitFeedbackUseCase } from './useCases/SubmitFeedbackUseCase';

const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbackRepository = new FeedbacksRepository();
  const nodemailerMailService = new MailService();
  const issueService = new IssueService();
  const bucketService = new BucketService();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbackRepository,
    nodemailerMailService,
    issueService,
    bucketService
  );

  const feedback = await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  });

  res.status(201).json({ actiom: true, data: feedback });
});

export { routes };
