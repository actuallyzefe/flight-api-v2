import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UserInfoDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  surname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber()
  phone_number: string;

  @IsNumber()
  @IsNotEmpty()
  birth_year: number;

  @IsNumber()
  @IsNotEmpty()
  id_card_no: number;

  @IsString()
  @IsNotEmpty()
  gender: string;
}
