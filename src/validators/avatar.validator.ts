import { Injectable, NotFoundException } from '@nestjs/common';
import validator from 'validator';

@Injectable()
export class Validator {
  validateBase64(base64: string) {
    return validator.isBase64(base64);
  }

  async validateUserId(userId: number) {
    if (userId < 1) throw new NotFoundException('User ID must be greater than or equal to 1');
    if (userId > 12) throw new NotFoundException('User ID must be less than or equal to 12');
  }
}
