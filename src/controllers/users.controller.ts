import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateInput } from '../interfaces/CreateInput';
import { User } from '../modules/schema/user.schema';
import { UserService } from '../services/users.service';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../interfaces/Create-User.dto';
import { DeleteUserDto } from '../interfaces/DeleteUserDto';
import { UserValidator } from '../validators/user.validator';
import { UserException } from '../validators/user.exception';
import { validateUser } from '../modules/schema/schemaValidator/createUserSchemaValidator';
import { ApiBody, ApiTags } from '@nestjs/swagger';
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private readonly userValidator: UserValidator,
  ) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<{}> {
    return this.userService.findById(id);
  }
  @Get(':_id')
  async getById(@Param('_id', ParseIntPipe) _id: string): Promise<{}> {
    return this.userRepository.getById(_id);
  }

  @Post()
  @ApiBody({ type: CreateUserDto })
  async create(@Body() input: CreateInput): Promise<CreateUserDto> {
    try {
      await validateUser(input);
      return this.userService.createUser(input);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':_id')
  async deleteUser(@Param('_id') _id: string): Promise<DeleteUserDto> {
    try {
      await this.userValidator.validateUserExists(_id);
      return this.userService.deleteUser(_id);
    } catch (error) {
      throw new UserException('User not found');
    }
  }
}
