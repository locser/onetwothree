import { IsEmail, IsNotEmpty, MaxLength, Min } from 'class-validator';
export class SignUpDto {
  @IsNotEmpty()
  @MaxLength(30)
  name: string;

  @IsNotEmpty()
  @MaxLength(15)
  nick_name: string;

  @IsNotEmpty()
  @MaxLength(50)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  // @IsStrongPassword()
  @Min(4)
  password: string;
}

export class LoginDto {
  @IsNotEmpty()
  @MaxLength(50)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  // @IsStrongPassword()
  password: string;
}
