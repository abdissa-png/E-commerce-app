/* eslint-disable prettier/prettier */
import { Entity } from "typeorm";
import { Column } from "typeorm/decorator/columns/Column";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";


@Entity({name:"products"})
export class Product{
    
    @PrimaryGeneratedColumn({type:"bigint"})
    id:number;
    
    @Column()
    name:string;
    
    @Column()
    image:string;
    
    @Column()
    price:string
    
    @Column({nullable:true})
    discountedPrice:string


}