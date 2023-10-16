import { LocalAuthGuard } from '@module/auth/guard/local.guard';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { RequestWithUser } from 'src/types/requests.type';
import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @Post('signUp')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signIn')
  async signIn(@Body() loginDto: LoginDto, @Request() req: RequestWithUser) {
    console.log('signInnnnnnnnnnnnnnnnnnnnnnnn');
    return await this.authService.signIn(req.user._id.toString());
  }
}
