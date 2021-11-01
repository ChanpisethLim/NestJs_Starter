import { Exclude } from "class-transformer";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Borrow } from "src/books/entities/borrow.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Exclude()
    @Column()
    password: string

    @Column({default: false})
    isAdmin: boolean

    @OneToMany(() => Borrow, borrow => borrow.user)
    borrows: Borrow[]

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10)
    }

    async validatePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password)
    }
    
}