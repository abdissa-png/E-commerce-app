/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Patch, Post, Param, ParseIntPipe, Body } from '@nestjs/common';
import { reviewdto } from './dtos/review.dto';
import { UserService } from './user.service';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';

@Controller('api/v1/user')
export class UserController {
    constructor(private userService: UserService){}
    //start of review methods
    @Get('reviews')
    getReviews(@GetCurrentUserId() id: number){
        return this.userService.viewReviews(id);
    }

    @Post('review')
    postReview(@GetCurrentUserId() id: number, @Body() userReview: reviewdto){
       return this.userService.submitReview(id, userReview);

    }
    @Get('review/:id')
    getReview(@Param('id', ParseIntPipe) id: number){
        return this.userService.getReview(id);
    }
    @Patch('review/:id')
    updateReview(@Param('id', ParseIntPipe) id: number, @Body() userReview: reviewdto){
        return this.userService.modifyReview(id, userReview);
    }

    @Delete('review/:id')//id of the review not the user
     deleteReview(@Param('id', ParseIntPipe) id: number){
        return  this.userService.DeleteReview(id);
    }
    //end of review methods

    
    //start of cart methods
    @Get('cart')
    getCart(@GetCurrentUserId() id: number){
        return this.userService.viewCart(id);
    }
    //end of cart methods

    //start of purchase method
    @Post('purchase/:pid')
    purchaseProduct(@GetCurrentUserId() id: number,@Param('pid', ParseIntPipe) pid:number){
     
        return this.userService.purchaseProduct(id, pid);
    }
    //end of purchase method
    
}
