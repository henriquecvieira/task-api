import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Avatar, AvatarDocument } from '../modules/schema/avatar.schema';
import { PresenterIdAvatar } from '../Presenter/presenterIdAvatar';

@Injectable()
export class AvatarRepository {
  [x: string]: any;
  constructor(
    @InjectModel(Avatar.name)
    private readonly avatarModel: Model<AvatarDocument>,
    private readonly presenterIdAvatar: PresenterIdAvatar,
  ) {}

  async saveAvatar(id: number, avatar: string) {
    const createdAvatar = new this.avatarModel({ id, avatar });
    return createdAvatar.save();
  }

  async findAll(): Promise<Avatar[]> {
    return this.avatarModel.find().exec();
  }

  async findAvatarByUserId(id: number) {
    const result = await this.avatarModel.findOne({ id });
    return Boolean(result);
  }
}
