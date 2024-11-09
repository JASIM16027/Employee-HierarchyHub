
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';;


@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @Column()
  @IsNotEmpty()
  password: string;

}

