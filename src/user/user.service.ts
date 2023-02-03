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
          throw new Error('User or product not found');
        }
    
        const purchase = await  this.purchaseRepository.create({ user, product });
        await this.purchaseRepository.save(purchase);
      }
    
    async viewCart(id: number){//retriev purchasedproduct in user entity
        const cart = await this.purchaseRepository.findBy({userId:id});
        console.log(`cart is ${cart}`);
        var it : number;
        var i : number;
        var cartt= [];
        for(i=0; i<cart.length; i++){
        it = cart[i].productId
        cartt.push(await this.productRepository.findOneBy({id: it}));
        }
        return cartt;
    }
    async viewReviews(id: number){//retrieve reviews at user
        // console.log(`id is ${id} done`);
        // const users = await this.userRepository.find({relations: ['reviews']});
        // console.log('user')
        
        // var i:number;
        // for(i= 0; i<users.length; i++){
        //     if(!users[i]){
        //         throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
        // }
        // if(users[i].id == id){
        //     return }
        // };
        const user = await this.userRepository.findOneBy({id});
        console.log(user);

        const reviews = await this.reviewRepository.findBy({userId: id});
        return reviews;
        




       
        

        // const user = await this.userRepository.findOneBy(userId, {
        //     relations: ['reviews'],
        //   });
        //   return user.reviews;
        

        
          
    //     if(!user){
    //         throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    // }
 
    //    return this.reviewRepository.findBy({user: user});
       
            
    }
    async submitReview(id: number, reviewDetails: reviewParams){//add reviews to review table
        const user = await this.userRepository.findOneBy({ id });
        
        
        if(!user){
                throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
        }
        const newReview = this.reviewRepository.create({...reviewDetails, user, });
        console.log(newReview);
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
