import { SubmitFeedbackUseCase } from './SubmitFeedbackUseCase';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  {
    create: createFeedbackSpy,
  },
  { sendMail: sendMailSpy }
);

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedback.execute({
        type: 'bug',
        comment: 'This is a bug',
        screenshot: 'data:image/jpeg;base64,example',
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback without type', async () => {
    await expect(
      submitFeedback.execute({
        type: '',
        comment: 'This is a bug',
        screenshot: 'data:image/jpeg;base64,example',
      })
    ).rejects.toThrow();
  });

  it('should not be able to submit a feedback without comment', async () => {
    await expect(
      submitFeedback.execute({
        type: 'bug',
        comment: '',
        screenshot: 'data:image/jpeg;base64,example',
      })
    ).rejects.toThrow();
  });

  it('should not be able to submit a feedback with an invalid screenshot', async () => {
    await expect(
      submitFeedback.execute({
        type: 'bug',
        comment: 'This is a bug',
        screenshot: 'test.jpg',
      })
    ).rejects.toThrow();
  });
});
