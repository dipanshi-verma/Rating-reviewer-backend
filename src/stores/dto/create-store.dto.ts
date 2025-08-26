import { IsEmail, IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(400, {
    message: 'Address cannot be more than 400 characters long',
  })
  address: string;
}