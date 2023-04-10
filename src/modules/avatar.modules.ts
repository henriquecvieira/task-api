import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Avatar, AvatarSchema } from '../modules/schema/avatar.schema';
import { AvatarController } from '../controllers/avatar.controller';
import { AvatarService } from '../services/avatar.service';
import { AvatarRepository } from '../repositories/avatar.repository';
import { User, UserSchema } from './schema/user.schema';
import { Validator } from '../validators/avatar.validator';
import { UserService } from '../services/users.service';
import { RabbitMQService } from '../notification/rabbitmq.service';
import { UserRepository } from '../repositories/user.repository';
import { ConvertImage } from '../services/base64.service';
import { PresenterUsersId } from '../Presenter/presenterUsersDto';
import { PresenterCreateUserDto } from '../Presenter/presenterCreateUserDto';
import { PresenterDeleteUserDto } from '../Presenter/presenterDeleteUserDto';
import { PresenterIdAvatar } from '../Presenter/presenterIdAvatar';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Avatar.name, schema: AvatarSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AvatarController],
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
    PresenterIdAvatar,
  ],
})
export class AvatarModule {}
