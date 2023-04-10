import { Controller, Get, Param, NotFoundException, ParseIntPipe, Res } from '@nestjs/common';
import { Response } from 'express';
import { ConvertImage } from '../services/base64.service';
import { AvatarService } from '../services/avatar.service';
import { Avatar } from '../modules/schema/avatar.schema';
import { Validator } from '../validators/avatar.validator';
import { AvatarRepository } from '../repositories/avatar.repository';

@Controller()
export class AvatarController {
  constructor(
    private readonly avatarService: AvatarService,
    private readonly convertImage: ConvertImage,
    private readonly validator: Validator,
    private readonly avatarRepository: AvatarRepository,
  ) {}

  @Get('/avatar')
  async getAllAvatars(): Promise<Avatar[]> {
    return this.avatarService.findAll();
  }

  @Get(':id/avatar')
  async getImageById(@Param('id', ParseIntPipe) id: number) {
    return this.avatarService.getImageById(id);
  }

  @Get('/avatar/:id')
  async getAvatarById(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const avatar = await this.avatarService.findById(id);
    const response = res.send(avatar);
    return response;
  }
}
