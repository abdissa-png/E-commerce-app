/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

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
    @ManyToOne(()=>User,(user)=>user.reviews)
    user:User;
}