import { AvatarDto } from '../interfaces/AvatarDto';
import { ConvertImage } from '../services/base64.service';

export class PresenterIdAvatar {
  private readonly convertImage: ConvertImage;
  constructor() {
    this.convertImage = new ConvertImage();
  }
  async presenter(avatar: AvatarDto) {
    const base64 = await this.convertImage.getBase64Image(avatar.avatar);
    return {
      id: avatar.id,
      name: `${avatar.first_name} ${avatar.last_name}`,
      base64_avatar: base64,
    };
  }
}
