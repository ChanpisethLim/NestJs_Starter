import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { createBookDto } from '../dtos/createBook.dto';
import { updateBookDto } from '../dtos/updateBook.dto';
import { Book } from '../entities/book.entity';

@Injectable()
export class BookService {
    constructor( @InjectRepository(Book) private bookRepository: Repository<Book> ) {}

    async add(data: createBookDto): Promise<Book> {
        const book = this.bookRepository.create(data)
        return await this.bookRepository.save(book)
    }

    async findAll(): Promise<Book[]> {
        return this.bookRepository.find()
    }

    async findAllBorrowedBook(): Promise<Book[]> {
        return this.bookRepository.find({ isBorrowed: true })
    }

    async findAllUnborrowBook(): Promise<Book[]> {
        return this.bookRepository.find({ isBorrowed: false })
    }

    async findByAuthor(author: string): Promise<Book[]> {
        const books = await this.bookRepository.find({author})
        
        if(!books.length) {
            throw new NotFoundException('No book from this author')
        }

        return books
    }

    async findByTitle(title: string): Promise<Book[]> {
        const books = await this.bookRepository.find({title})

        if(!books.length) {
            throw new NotFoundException()
        }

        return books
    }

    async updateById(id: number, data: updateBookDto): Promise<Book> {
        const book = await this.bookRepository.findOne(id)

        if(!book) {
            throw new NotFoundException()
        }

        Object.assign(book, data)

        return await this.bookRepository.save(book)
    }

    async deleteById(id: number): Promise<Book> {
        const book = await this.bookRepository.findOne(id)

        if(!book) {
            throw new NotFoundException()
        }

        return await this.bookRepository.remove(book)
    }
}
