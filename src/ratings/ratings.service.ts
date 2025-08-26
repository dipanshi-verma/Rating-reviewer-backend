import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './rating.entity';
import { CreateRatingDto } from './dto/create-rating.dto';
import { User } from '../users/user.entity';
import { Store } from '../stores/store.entity';

@Injectable()
    export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private ratingsRepository: Repository<Rating>,
  ) {}

  async create(
    createRatingDto: CreateRatingDto,
    user: User,
    store: Store,
  ): Promise<Rating> {
    const newRating = this.ratingsRepository.create({
      ...createRatingDto,
      user,
      store,
    });
    return this.ratingsRepository.save(newRating);
  }
}
