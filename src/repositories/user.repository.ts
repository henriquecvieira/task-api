import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../modules/schema/user.schema';
import { ResponseDelete } from '../interfaces/ResponseDelete';

@Injectable()
export class UserRepository {
  save(user: User): User | PromiseLike<User> {
    throw new Error('Method not implemented.');
  }

  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getById(_id: string): Promise<User> {
    return this.userModel.findOne({ _id }).exec();
  }

  async createUser(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async deleteUser(_id: string): Promise<ResponseDelete> {
    return (await this.userModel.findByIdAndDelete({ _id }).exec()) as ResponseDelete;
  }
}
