import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase()) // Force lowercase
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
