import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() userCredentials: SignUpDto) {
    return this.authService.signup(userCredentials);
  }
  @Post('login')
  login(@Body() userCredentials: LoginDto) {
    return this.authService.login(userCredentials);
  }
}
