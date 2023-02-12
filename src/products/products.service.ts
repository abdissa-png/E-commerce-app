/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/Product';

@Injectable()
export class ProductService implements OnModuleInit {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}
  async onModuleInit() {
    const products=[
      {name:"Brown Jacket",image:"pho1.jpeg",price:"15.99",discountedPrice:"12.99"},
      {name:"Mini Girl Shirt",image:"pho2.jpeg",price:"19.99",discountedPrice:"14.99"},
      {name:"White Jacket",image:"pho3.jpeg",price:"11.99",discountedPrice:"8.99"},
      {name:"Flower shirt",image:"pho4.jpeg",price:"15.99",discountedPrice:"12.99"},
      {name:"Cotton Rose Trouser",image:"pho5.jpeg",price:"19.99",discountedPrice:"16.99"},
      {name:"Nike Air",image:"pho6.jpeg",price:"15.99",discountedPrice:"12.99"},
      {name:"Silver Hi",image:"pho7.jpeg",price:"17.99",discountedPrice:"14.99"},
      {name:"Red Dress",image:"pho8.jpeg",price:"16.99",discountedPrice:"12.99"},
      {name:"Black T-shirt",image:"pho9.jpeg",price:"15.99",discountedPrice:"12.99"}
    ];
    await this.productRepository.count().then(count=>{
      if(!count){
        this.productRepository.save(products);
      }
    })
  }

  async allProducts() {
    return await this.productRepository.find();
  }
}
