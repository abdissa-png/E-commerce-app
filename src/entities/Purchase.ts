/* eslint-disable prettier/prettier */
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity({name:"purchase"})
export class Purchase {
    @PrimaryGeneratedColumn({type:"bigint"})
    id:number;

  @ManyToOne(type => User, user => user.id)
  user: User;

  @ManyToOne(type => Product, product => product.id)
  product: Product;

  @Column()
  date: Date;
 //addition 
  @Column()
  userId: number;

  @Column()
  productId: number;

  @Column({default: 1})
  quantity: number;
  
//end Addition


  @BeforeInsert()
  setDate() {
    this.date = new Date();
  }
}