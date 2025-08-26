import { IsNotEmpty, IsNumber, IsEmail, IsString, MaxLength } from 'class-validator';

export class AddStoreDto {
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

  @IsNotEmpty()
  @IsNumber()
  ownerId: number;
}