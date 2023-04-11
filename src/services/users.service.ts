import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../modules/schema/user.schema';
import { UserRepository } from '../repositories/user.repository';
import { ResponseDelete } from '../interfaces/ResponseDelete';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { SendEmailService } from '../notification/send.email.service';
import { PresenterUsersId } from '../Presenter/presenterUsersDto';
import { PresenterCreateUserDto } from '../Presenter/presenterCreateUserDto';
import { PresenterDeleteUserDto } from '../Presenter/presenterDeleteUserDto';
import { RabbitMQService } from '../notification/rabbitmq.service';
import { Validator } from '../validators/avatar.validator';
import { CreateUserDto } from '../interfaces/Create-User.dto';
import { DeleteUserDto } from '../interfaces/DeleteUserDto';
import { validateUser } from '../modules/schema/schemaValidator/createUserSchemaValidator';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly rabbitMQService: RabbitMQService,
    private readonly presenterUsersId: PresenterUsersId,
    private readonly presenterCreateUserDto: PresenterCreateUserDto,
    private readonly presenterDeleteUserDto: PresenterDeleteUserDto,
    private readonly validator: Validator,
  ) {}

  async findById(id: number) {
    await this.validator.validateUserId(id);
    const fullUrl = `https://reqres.in/api/users/${id}`;
    try {
      const response = await axios.get(fullUrl);
      return this.presenterUsersId.presenter(response.data.data);
    } catch (error) {
      throw error;
    }
  }

  async createUser({ name, job }: { name: string; job: string }): Promise<CreateUserDto> {
    try {
      const user = new User();
      user.name = name;
      user.job = job;
      user._id = uuidv4();
      const validationResult = await validateUser(user);
      if (validationResult !== true) {
        throw new BadRequestException(validationResult);
      }
      SendEmailService.sendEmail();
      this.sendMessage('created user succesfully!');
      const saveInDb = await this.userRepository.createUser(user);
      return this.presenterCreateUserDto.presenter(user);
    } catch (err: any) {
      throw err;
    }
  }

  async deleteUser(_id: string): Promise<DeleteUserDto> {
    try {
      const deleteUser = await this.userRepository.deleteUser(_id);
      return this.presenterDeleteUserDto.presenter(deleteUser);
    } catch (err: any) {
      throw err;
    }
  }
  async sendMessage(message: string): Promise<void> {
    await this.rabbitMQService.publishMessage(message);
  }
}
