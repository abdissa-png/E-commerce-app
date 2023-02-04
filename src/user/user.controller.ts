/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Patch, Post, Param, ParseIntPipe, Body } from '@nestjs/common';
import { reviewdto } from './dtos/review.dto';
import { UserService } from './user.service';
import { Public } from 'src/common/decorators/public.decorator';
@Public()
@Controller('user')
export class UserController {
    constructor(private userService: UserService){}
    //start of review methods
    @Get(':id/review')
    getReviews(@Param('id', ParseIntPipe) id: number){
        return this.userService.viewReviews(id);
    }

    @Post(':id/review')
    postReview(@Param('id', ParseIntPipe) id: number, @Body() userReview: reviewdto){
       return this.userService.submitReview(id, userReview);

    }

    @Patch(':id/review')
    updateReview(@Param('id', ParseIntPipe) id: number, @Body() userReview: reviewdto){
        return this.userService.modifyReview(id, userReview);
    }

    @Delete(':id/review')//id of the review not the user
     deleteReview(@Param('id', ParseIntPipe) id: number){
        return  this.userService.DeleteReview(id);
    }
    //end of review methods

    
    //start of cart methods
    @Get(':id/cart')
    getCart(@Param('id', ParseIntPipe) id: number){
        return this.userService.viewCart(id);
    }
    //end of cart methods

    //start of purchase method
    @Post(':id/:pid/purchase')
    purchaseProduct(@Param('id', ParseIntPipe) id: number,@Param('pid', ParseIntPipe) pid:number){
     
        return this.userService.purchaseProduct(id, pid);
    }
    //end of purchase method
    
}
