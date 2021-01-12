import {Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm'
import User from './User'

@Entity('wallets')
export default class Wallet {
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column()
    stock: string;
    
    @Column()
    stockName: string;
    
    @Column()
    amount: string;
    
    @Column()
    price: Date;
    
}