/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { IsEmpty } from "class-validator";

@Entity({name:"reviews"})
export class Review{
    @PrimaryGeneratedColumn({type:"bigint"})
    id:number;
    @Column()
    name:string;
    @Column()
    number:number;
    @Column()
    message:string;
    @Column()
    @IsEmpty()
    userId:number;
    
    @ManyToOne(()=>User,(user)=>user.reviews)
    user:User;
}