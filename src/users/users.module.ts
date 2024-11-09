
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserService } from './users.service';



@Module({
  imports: [TypeOrmModule.forFeature([User]),

  JwtModule.register({
    global: true,
    secret: process.env.SECRET_KEY,
    signOptions: { expiresIn: process.env.expireTime },
  }),


  ],
  providers: [UserService, AuthService],
  controllers: [UserController],
  exports: [AuthService, UserService]
})
export class UserModule { }
