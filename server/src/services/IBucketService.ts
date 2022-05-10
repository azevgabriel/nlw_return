export interface SendImageDTO {
  bucketName: string;
  screenshot: string;
}

export interface IBucketService {
  sendImage: (data: SendImageDTO) => Promise<string>;
}
