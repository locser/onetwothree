import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: '',
    example: 'Lộc',
  })
  name: string;
  nickName: string;
  email: string;
  password: string;
}
