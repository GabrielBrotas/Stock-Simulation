import {Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm'
import User from './User'

@Entity('transactions')
export default class Transaction {
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column()
    stockSymbol: string;
    
    @Column()
    stockName: string;
    
    @Column()
    amount: string;
    
    @Column()
    price: Date;
    
}