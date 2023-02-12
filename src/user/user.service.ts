/* eslint-disable prettier/prettier */
/* eslint-disable no-var */
/* eslint-disable prefer-const */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/Product';
import { Review } from 'src/entities/Review';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';
import { reviewdto } from './dtos/review.dto';
import { reviewParams } from './utils/type';
import { Purchase } from 'src/entities/Purchase';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    @InjectRepository(Purchase) private purchaseRepository: Repository<Purchase>){

    }
    async purchaseProduct(userId: number, productId: number) {
        const user = await this.userRepository.findOneBy({ id: userId });
        const product = await this.productRepository.findOneBy({ id: productId });
    
        if (!user || !product) {
            throw new HttpException('user or product not found', HttpStatus.BAD_REQUEST);
        }
        const cart = await this.purchaseRepository.findBy({userId:userId, productId: productId});
        
        if(cart.length == 0){

        
    
        const purchase = await  this.purchaseRepository.create({ user, product });
        await this.purchaseRepository.save(purchase);}
        else if(cart.length == 1){
           let quantity = cart[0].quantity+1;
           await this.purchaseRepository.update({userId:userId, productId: productId},{quantity});
        }else{
            throw new HttpException('something went wrong', HttpStatus.BAD_REQUEST); 
        }
      }
    
    async viewCart(id: number){//retriev purchasedproduct in user entity
        const cart = await this.purchaseRepository.findBy({userId:id});
        var it : number;
        var i : number;
        var cartt= [];
        for(i=0; i<cart.length; i++){
        it = cart[i].productId
        const product=await this.productRepository.findOneBy({id: it});
        cartt.push({...product,quantity:cart[i].quantity});
        }
        return cartt;
    }
    async getReview(id:number){
        return await this.reviewRepository.findOneBy({id});
    }
    async viewReviews(id: number){//retrieve reviews at user

        const user = await this.userRepository.findOneBy({id});

        const reviews = await this.reviewRepository.findBy({userId: id});
        return reviews;
        




       
        

        
       
            
    }
    async submitReview(id: number, reviewDetails: reviewParams){//add reviews to review table
        const user = await this.userRepository.findOneBy({ id });
        
        
        if(!user){
                throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
        }
        const newReview = this.reviewRepository.create({...reviewDetails, user, });
        return this.reviewRepository.save(newReview);
      
    }
    async modifyReview(id: number, reviewDetails: reviewParams){
        const user = await this.reviewRepository.findOneBy({ id });
        
        
        if(!user){
                throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
        }
        const newReview = this.reviewRepository.update({ id }, {...reviewDetails})
        return 'updated';
      
    }
    async DeleteReview(id: number){
        return this.reviewRepository.delete({ id });
    }
}
