import { User } from '../modules/schema/user.schema';
import { CreateUserDto } from '../interfaces/CreateUserDto';
export class PresenterCreateUserDto {
  async presenter(user: User): Promise<CreateUserDto> {
    return {
      _id: user._id,
      name: user.name,
      job: user.job,
    };
  }
}
