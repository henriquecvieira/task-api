import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../modules/schema/user.schema';
import { AvatarService } from '../services/avatar.service';
import { UserController } from '../controllers/users.controller';
import { UserService } from '../services/users.service';
import { Avatar, AvatarSchema } from './schema/avatar.schema';
import { RabbitMQService } from '../notification/rabbitmq.service';
import { UserRepository } from '../repositories/user.repository';
import { AvatarRepository } from '../repositories/avatar.repository';
import { Validator } from '../validators/avatar.validator';
import { ConvertImage } from '../services/base64.service';
import { PresenterUsersId } from '../Presenter/presenterUsersDto';
import { PresenterCreateUserDto } from '../Presenter/presenterCreateUserDto';
import { PresenterDeleteUserDto } from '../Presenter/presenterDeleteUserDto';
import { UserValidator } from '../validators/user.validator';
import { UserException } from '../validators/user.exception';
import { PresenterIdAvatar } from '../Presenter/presenterIdAvatar';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Avatar.name, schema: AvatarSchema }]),
  ],
  controllers: [UserController],
  providers: [
    AvatarRepository,
    AvatarService,
    Validator,
    ConvertImage,
    UserService,
    AvatarService,
    RabbitMQService,
    UserRepository,
    AvatarRepository,
    ConvertImage,
    PresenterUsersId,
    PresenterCreateUserDto,
    PresenterDeleteUserDto,
    UserValidator,
    UserException,
    PresenterIdAvatar,
  ],
})
export class UsersModule {}
