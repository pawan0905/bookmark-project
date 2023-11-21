import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  IsOptional,
} from 'class-validator';
export class Authdto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  last_logged_in_at: string;
}
export class SignupDto {
  @IsEmail()
  email: string;
  @IsPhoneNumber()
  phone_number: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  password: string;
}
export class signInDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
export class UpdatePassword {
  @IsNotEmpty()
  old_password: string;
  @IsNotEmpty()
  new_password: string;
  @IsNotEmpty()
  confirm_password: string;
}
export class GetAllUsersDto {
  @IsOptional()
  page: number;
  @IsOptional()
  perPage: number;
}
