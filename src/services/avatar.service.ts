import { Injectable, NotFoundException } from '@nestjs/common';
import { AvatarRepository } from '../repositories/avatar.repository';
import { Avatar } from '../modules/schema/avatar.schema';
import { ConvertImage } from '../services/base64.service';
import { Validator } from '../validators/avatar.validator';
import { UserDto } from '../interfaces/UserDto';
import axios from 'axios';
import { PresenterIdAvatar } from '../Presenter/presenterIdAvatar';

@Injectable()
export class AvatarService {
  constructor(
    private readonly avatarRepository: AvatarRepository,
    private readonly validator: Validator,
    private readonly convertImage: ConvertImage,
    private readonly presenterIdAvatar: PresenterIdAvatar,
  ) {}

  async saveAvatar(userId: number, url: string) {
    try {
      const response = await axios.get(url);
      const base64Image = await this.convertImage.getBase64Image(response.data.data.avatar);
      const existingAvatar = await this.avatarRepository.findAvatarByUserId(userId);
      if (existingAvatar) {
        return;
      }
      return this.avatarRepository.saveAvatar(userId, base64Image);
    } catch (err: any) {
      throw err;
    }
  }

  async findAll(): Promise<Avatar[]> {
    try {
      return this.avatarRepository.findAll();
    } catch (err: any) {
      throw err;
    }
  }
  async findById(id: number) {
    try {
      const avatar = await this.avatarRepository.findById(id);
      if (!avatar) {
        throw new NotFoundException('Avatar not found');
      }
      return avatar;
    } catch (err: any) {
      throw err;
    }
  }

  async getImageById(id: number) {
    try {
      await this.validator.validateUserId(id);
      const data = await this.avatarFindById(id);
      const base64Image = await this.convertImage.getBase64Image(data.avatar);
      const existingAvatar = await this.avatarRepository.findAvatarByUserId(id);
      if (!existingAvatar) {
        await this.avatarRepository.saveAvatar(data.id, base64Image);
        return this.presenterIdAvatar.presenter(data);
      }
      return this.presenterIdAvatar.presenter(data);
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  }

  async avatarFindById(id: number): Promise<UserDto> {
    const fullUrl = `https://reqres.in/api/users/${id}`;
    try {
      const response = await axios.get(fullUrl);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
}
