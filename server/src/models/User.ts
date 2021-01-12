import {Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm'
import jwt from 'jsonwebtoken'

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column()
    email: string;
    
    @Column()
    password: string;
    
    @Column()
    passwordResetToken: string;
    
    @Column()
    passwordResetTokenExpires: Date;

    @Column()
    cash: number;

    generateToken() {
        return jwt.sign({id: this.id}, 'secret', {
            expiresIn: 86400
        })
    }
}