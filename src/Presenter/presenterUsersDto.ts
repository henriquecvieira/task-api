import { UserDto } from '../interfaces/UserDto';
export class PresenterUsersId {
  async presenter(user: UserDto) {
    return {
      id: user.id,
      email: user.email,
      name: `${user.first_name} ${user.last_name}`,
      avatar: user.avatar,
    };
  }
}
