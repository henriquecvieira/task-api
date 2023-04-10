import { HttpException, HttpStatus } from '@nestjs/common';

export class CreateUserException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
