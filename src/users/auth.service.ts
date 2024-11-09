
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create.user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService,
    private jwtService: JwtService) { }

  async signIn(email: string, password: string): Promise<{ access_token: string }> {
    if(!email || !password)  throw new UnauthorizedException('Authentication Failed.');

    const user = await this.usersService.findUserByEmail(email);

    if (!user || !(await this.comparePasswords(password, user.password))) {
      throw new UnauthorizedException('Authentication Failed.');
    }
    const payload = { userId: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };

  }

  async signUp(signUpDto: CreateUserDto): Promise<any> {

   if(!signUpDto.email ||!signUpDto.password) throw new UnauthorizedException('All fields are required.');

    const existingUser = await this.usersService.findUserByEmail(signUpDto.email);
    if (existingUser) {
      throw new UnauthorizedException('User with this email already exists.');
    }
   
    const hashedPassword = await this.hashPassword(signUpDto.password);

    await this.usersService.createUser({ ...signUpDto, password: hashedPassword });

    return { ...signUpDto };
  }


  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  private async comparePasswords(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }
}
