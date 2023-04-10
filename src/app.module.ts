import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/user.modules';
import { AvatarModule } from './modules/avatar.modules';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';

dotenv.config();
@Module({
  imports: [UsersModule, AvatarModule, MongooseModule.forRoot(process.env.MONGO_URL), DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
