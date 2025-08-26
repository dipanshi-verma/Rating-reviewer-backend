import { 
    Controller,
     Post,
  Body,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
 } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UsersService } from '../users/users.service';
import { StoresService } from '../stores/stores.service';


@Controller('ratings')
@UseGuards(JwtAuthGuard) 
export class RatingsController {
     constructor(
    private ratingsService: RatingsService,
    private usersService: UsersService,
    private storesService: StoresService,
  ) {}

  @Post()
  async createRating(
    @Request() req,
    @Body('storeId') storeId: number,
    @Body() createRatingDto: CreateRatingDto,
  ) {
    // Get the user from the JWT payload
    const user = await this.usersService.findOneById(req.user.userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Get the store to be rated
    const store = await this.storesService.findOneById(storeId);
    if (!store) {
      throw new HttpException('Store not found', HttpStatus.NOT_FOUND);
    }

    return this.ratingsService.create(createRatingDto, user, store);
  }
}
