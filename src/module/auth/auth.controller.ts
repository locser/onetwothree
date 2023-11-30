import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { RequestWithUser } from 'src/types/requests.type';
import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from './dto/sign-up.dto';
import { AuthGuardVip } from './guard/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    const data = await this.authService.signUp(signUpDto);
    return data;
  }

  // @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@Body() loginDto: LoginDto) {
    return await this.authService.signIn(loginDto.email, loginDto.password);
  }

  @UseGuards(AuthGuardVip)
  @Post('log-out')
  async logout(@Request() req: RequestWithUser) {
    return await this.authService.logout(req.user._id.toString());
  }
}
