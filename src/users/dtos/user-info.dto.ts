import {
  IsDate,
  IsDateString,
  IsEmail,
  IsNotEmpty,
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

  @IsDateString()
  birth_date: Date;

  id_card_no: string;

  @IsString()
  @IsNotEmpty()
  gender: string;
}
