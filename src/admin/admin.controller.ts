
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { StoresService } from '../stores/stores.service';
import { CreateStoreDto } from '../stores/dto/create-store.dto';
import { User } from '../users/user.entity';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard} from '../auth/guards/jwt-auth.guard';
import { Store } from '../stores/store.entity';
import { AddStoreDto } from '../stores/dto/add-store.dto';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard) // Protect all admin routes
// use the combined guard
@Roles('system_administrator') // Only system administrators can access
export class AdminController {
  constructor(
    private usersService: UsersService,
    private storesService: StoresService,
  ) {}

  @Post('add-store')
  @HttpCode(HttpStatus.CREATED)
  async addStore(
    @Body() addStoreDto: AddStoreDto,
  ): Promise<Store> {
    const { ownerId, ...storeData } = addStoreDto;
    const storeOwner = await this.usersService.findOneById(ownerId);
    return this.storesService.create(storeData, storeOwner);
  }

  @Post('add-user')
  @HttpCode(HttpStatus.CREATED)
  async addUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}