import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserValidator {
  constructor(private readonly userRepository: UserRepository) {}

  async validateUserExists(_id: string): Promise<void> {
    const user = await this.userRepository.getById(_id);
    if (!user) {
      throw new Error('User not found');
    }
  }
}
