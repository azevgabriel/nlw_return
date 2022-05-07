export interface SendMailDTO {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface IMailService {
  sendMail: (data: SendMailDTO) => Promise<void>;
}
