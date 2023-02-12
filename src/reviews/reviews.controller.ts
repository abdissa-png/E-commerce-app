/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { ReviewsService } from './reviews.service';

@Controller('api/v1/reviews')
export class ReviewsController {
  constructor(private reviewService: ReviewsService) {}

  @Public()
  @Get()
  getReviews() {
    return this.reviewService.allReviews();
  }
}
