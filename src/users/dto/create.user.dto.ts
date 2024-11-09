
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @Length(4, 20, { message: "Username must be between 4 and 20 characters" })
  username: string;

  @IsEmail({}, { message: "Please provide a valid email address" })
  email: string;

  @IsNotEmpty({ message: "Password cannot be empty" })
 @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, { message: "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number" })
  password: string;

}
