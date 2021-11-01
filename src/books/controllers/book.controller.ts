import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/users/auth/jwt.guard';
import { RolesGuard } from 'src/users/auth/roles.guard';
import { createBookDto } from '../dtos/createBook.dto';
import { updateBookDto } from '../dtos/updateBook.dto';
import { BookService } from '../services/book.service';

@Controller('book')
export class BookController {
    constructor( private bookService: BookService ) {}

    @Post()
    @UseGuards(JwtAuthGuard ,RolesGuard)
    addBook(@Body() data: createBookDto) {
        return this.bookService.add(data)
    }

    @Get()
    findAllBook() {
        return this.bookService.findAll()
    }

    @Get('/borrowed')
    findAllBorrowedBook() {
        return this.bookService.findAllBorrowedBook()
    }

    @Get('/unborrow') 
    findAllUnborrowBook() {
        return this.bookService.findAllUnborrowBook() 
    }

    @Get('/author')
    findBookByAuthor(@Query('author') author: string) {
        return this.bookService.findByAuthor(author)
    }

    @Get('/title')
    findBookByTitle(@Query('title') title: string) {
        return this.bookService.findByTitle(title)
    }

    @Patch('/:id')
    @UseGuards(JwtAuthGuard ,RolesGuard)
    updateBookById(
        @Param('id', ParseIntPipe) id: number, 
        @Body() data: updateBookDto
    ) {
        return this.bookService.updateById(id, data)
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard ,RolesGuard)
    deleteBookById(@Param('id', ParseIntPipe) id: number) {
        return this.bookService.deleteById(id)
    }
}
