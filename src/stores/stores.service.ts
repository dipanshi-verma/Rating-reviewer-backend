import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { User } from '../users/user.entity';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
  ) {}

  async create(createStoreDto: CreateStoreDto, owner: User): Promise<Store> {
    const newStore = this.storesRepository.create({
      ...createStoreDto,
      owner,
    });
    return this.storesRepository.save(newStore);
  }

  async findOneById(id: number): Promise<Store | null> {
    return this.storesRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Store[]> {
    return this.storesRepository.find();
  }
}
