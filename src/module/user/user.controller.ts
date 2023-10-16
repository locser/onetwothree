import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@Controller({ path: 'user', version: '1' })
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post('register')
  // async register(@Body() body: CreateUserDto) {
  //   const data = await this.userService.signUp(body);
  //   return {
  //     data: data,
  //   };
  // }
}
