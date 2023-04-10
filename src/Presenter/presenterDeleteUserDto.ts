import { ResponseDelete } from '../interfaces/ResponseDelete';
import { DeleteUserDto } from '../interfaces/DeleteUserDto';
export class PresenterDeleteUserDto {
  async presenter(user: ResponseDelete | null | undefined): Promise<DeleteUserDto> {
    if (!user) {
      throw new Error('User not found');
    }
    return {
      _id: user._id,
      name: user.name,
      job: user.job,
    };
  }
}
