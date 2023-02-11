/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { ProductService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductService) {}

  @Public()
  @Get()
  getProducts() {
    return this.productService.allProducts();
  }
}
