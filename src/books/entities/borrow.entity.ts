import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./book.entity";

@Entity()
export class Borrow {
    @PrimaryGeneratedColumn()
    id: number

    /* eager: boolean - If set to true, 
    the relation will always be loaded with the main entity 
    when using find* methods or QueryBuilder on this entity */
    @ManyToOne(() => User, user => user.borrows, {eager: true})
    user: User

    @OneToOne(() => Book, {eager: true})
    @JoinColumn()
    book: Book

    @Column({default: new Date().toDateString()})
    borrow_date: Date

    @Column({ default: false })
    isApproved: boolean
}