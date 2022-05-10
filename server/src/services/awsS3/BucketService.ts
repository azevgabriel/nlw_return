import { IBucketService, SendImageDTO } from '../IBucketService';
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

class BucketService implements IBucketService {
  async sendImage({ bucketName, screenshot }: SendImageDTO): Promise<string> {
    const base64Data = screenshot.replace(/^data:image\/png;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    console.log(buffer.length);

    const params = {
      Bucket: bucketName,
      Key: `${Date.now()}.png`,
      Body: buffer,
      ACL: 'public-read',
    };
    try {
      await s3.upload(params).promise();
      return `https://${bucketName}.s3.amazonaws.com/${params.Key}`;
    } catch (error) {
      throw new Error('Error uploading file');
    }
  }
}

export { BucketService };
