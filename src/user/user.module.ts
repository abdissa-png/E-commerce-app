import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { Product } from 'src/entities/Product';
import { Review } from 'src/entities/Review';
import { Purchase } from 'src/entities/Purchase';

@Module({
  imports: [TypeOrmModule.forFeature([User, Product, Review, Purchase])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
