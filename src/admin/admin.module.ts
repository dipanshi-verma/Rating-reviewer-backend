import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UsersModule } from '../users/users.module';
import { StoresModule } from '../stores/stores.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [UsersModule, StoresModule, AuthModule],
  controllers: [AdminController],
  providers: [],
})
export class AdminModule {}