import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: '9fc55c1a-6f37-413d-a616-0436ebdadaf6',
    description: `this will be created automatically`,
  })
  _id: string;

  @ApiProperty({
    example: 'Theo Vieira',
    description: `name to be entered for user creation`,
  })
  name: string;

  @ApiProperty({
    example: 'Node Js Developer',
    description: `jot to be entered for user creation`,
  })
  job: string;
}
