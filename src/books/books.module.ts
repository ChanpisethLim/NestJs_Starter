import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { BookController } from './controllers/book.controller'
import { BorrowController } from './controllers/borrow.controller'
import { Book } from './entities/book.entity';
import { Borrow } from './entities/borrow.entity';
import { BookService } from './services/book.service';
import { BorrowService } from './services/borrow.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Borrow]), UsersModule],
  controllers: [BookController, BorrowController],
  providers: [BookService, BorrowService],
})
export class BooksModule {}
