import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "./users/user.entity";
import { Store } from "./stores/store.entity";
import { Rating } from './ratings/rating.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { StoresModule } from './stores/stores.module';
import { AdminModule } from './admin/admin.module';
import { RatingsModule } from './ratings/ratings.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307, //  MySQL port for XAMPP
      username: 'root', // Default XAMPP username
      password: '', // Default XAMPP password
      database: 'reviewer_db', // Create this database in phpMyAdmin
      entities: [User, Store, Rating],
      synchronize: true, // This automatically creates tables.
    }),
    UsersModule,
    AuthModule,
    StoresModule,
    AdminModule,
    RatingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
