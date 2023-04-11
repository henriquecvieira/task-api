import axios, { AxiosResponse } from 'axios';

export class ConvertImage {
  async getBase64Image(imageUrl: string) {
    const response: AxiosResponse<ArrayBuffer> = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
    });
    const base64 = Buffer.from(response.data).toString('base64');
    return base64;
  }
}
