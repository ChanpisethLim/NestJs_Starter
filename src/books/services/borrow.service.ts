import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { updateBorrowDto } from '../dtos/updateBorrow.dto';
import { Book } from '../entities/book.entity';
import { Borrow } from '../entities/borrow.entity';

@Injectable()
export class BorrowService {
    constructor( 
        @InjectRepository(Borrow) private borrowRepository: Repository<Borrow>, 
        @InjectRepository(Book) private bookRepository: Repository<Book>,
        @InjectRepository(User) private userRepository: Repository<User>  
    ) {}

    async borrow(bookId: number, userId: number) { 
        const borrow = this.borrowRepository.create()

        const book = await this.bookRepository.findOne(bookId)
        const user = await this.userRepository.findOne(userId)

        borrow.book = book
        borrow.user = user

        return this.borrowRepository.save(borrow)
    }

    async cancel(borrowId: number, userId: number) {
        const borrow = await this.borrowRepository.findOne(borrowId)
        if(!borrow) {
            throw new NotFoundException()
        }

        if(borrow.user.id != userId) {
            throw new ForbiddenException()
        }

        await this.borrowRepository.remove(borrow)

        return { message: "Borrow has been canceled"}
    }

    async approve(data: updateBorrowDto) {
        const borrow = await this.borrowRepository.findOne(data.borrowId)
        const book = await this.bookRepository.findOne(data.bookId)
        if(!borrow || !book) {
            throw new NotFoundException()
        }

        borrow.isApproved = true
        book.isBorrowed = true

        await this.borrowRepository.save(borrow)
        await this.bookRepository.save(book)

        return { message: "Borrow has been approved"}
    }

    async reject(borrowId: number) {
        const borrow = await this.borrowRepository.findOne(borrowId)
        if(!borrow) {
            throw new NotFoundException()
        }

        await this.borrowRepository.remove(borrow)

        return { message: "Borrow has been rejected"}
    }

    async return(data: updateBorrowDto, userId: number) {
        const borrow = await this.borrowRepository.findOne(data.borrowId)
        const book = await this.bookRepository.findOne(data.bookId)
        if(!borrow || !book) {
            throw new NotFoundException()
        }

        if(borrow.user.id != userId) {
            throw new ForbiddenException()
        }

        book.isBorrowed = false

        await this.borrowRepository.remove(borrow)
        await this.bookRepository.save(book)

        return { message: "Book has been returned"}
    }

    async findAllBorrow() {
        return await this.borrowRepository.find()
    }

    async findAllApprovedBorrow() {
        return await this.borrowRepository.find({isApproved: true})
    }

    async findAllPendingApprove() {
        return await this.borrowRepository.find({isApproved: false})
    }
}
