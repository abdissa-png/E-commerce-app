/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Review } from 'src/entities/Review';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
  ) {}

  async allReviews() {
    return await this.reviewRepository.find();
  }
}
