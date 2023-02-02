/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Review } from "./Review";
import { Product } from "./Product";

@Entity({name:"users"})
export class User{
    @PrimaryGeneratedColumn({type:"bigint"})
    id:number;
    
    @Column({unique:true})
    email:string;
    
    @Column()
    hash:string;
    
    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Date;

    @Column({nullable:true})
    hashedRt:string

    @OneToMany(()=>Review,(review)=>review.user)
    reviews:Review[];

    @ManyToMany(type => Product, product => product.purchasers)
    @JoinTable()
    purchasedProducts: Product[];
}