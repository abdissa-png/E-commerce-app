/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User';
import { Product } from './entities/Product';
import { Review } from './entities/Review';


@Module({
  imports: [AuthModule, UserModule, ReviewsModule, ProductsModule,TypeOrmModule.forRoot({
    type: "mysql",
    host: "localhost",
    port: 3308,
    username: "root",
    password: "",
    database: "ecommerce",
    entities: [
        User,Product,Review
    ],
    synchronize: true
})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
