import { Controller, Get, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class UserController {
  constructor(private readonly authService: AuthService) { }



  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    const { email, password } = signInDto
    return this.authService.signIn(email, password);
  }

  @Post('registration')
  async signUp(@Body() signUpDto: CreateUserDto) {
    return this.authService.signUp(signUpDto);
  }

}
