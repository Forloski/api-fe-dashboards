import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  @MinLength(5)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @MinLength(15)
  password: string;
}
