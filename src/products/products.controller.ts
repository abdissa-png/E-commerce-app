/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { ProductService } from './products.service';

@Controller('api/v1/products')
export class ProductsController {
  constructor(private productService: ProductService) {}

  @Get()
  getProducts() {
    return this.productService.allProducts();
  }
}
