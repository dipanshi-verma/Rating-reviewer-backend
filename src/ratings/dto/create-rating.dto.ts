import { IsNotEmpty, IsNumber, Min, Max, IsString, MaxLength } from 'class-validator';

export class CreateRatingDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(5, { message: 'Rating cannot be more than 5' })
  rating: number;

  @IsString()
  @MaxLength(500, { message: 'Comment cannot be more than 500 characters' })
  comment: string;
}
