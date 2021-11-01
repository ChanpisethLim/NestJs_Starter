import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/users/auth/jwt.guard';
import { RolesGuard } from 'src/users/auth/roles.guard';
import { borrowBookDto } from '../dtos/borrowBook.dto';
import { updateBorrowDto } from '../dtos/updateBorrow.dto';
import { BorrowService } from '../services/borrow.service';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('borrow')
export class BorrowController {
    constructor( private borrowService: BorrowService ) {}

    @Post()
    borrowBook(@Body() data: borrowBookDto, @Request() req) {
        return this.borrowService.borrow(data.bookId, req.user.userId)
    }

    @Delete('/cancel/:id')
    cancelBorrow(@Param('id', ParseIntPipe) borrowId: number, @Request() req) {
        return this.borrowService.cancel(borrowId, req.user.userId)
    }

    @UseGuards(RolesGuard)
    @Patch('/approve')
    approveBorrow(@Body() data: updateBorrowDto) {
        return this.borrowService.approve(data)
    }

    @UseGuards(RolesGuard)
    @Delete('/reject/:id')
    rejectBorrow(@Param('id', ParseIntPipe) borrowId: number) {
        this.borrowService.reject(borrowId)
    }

    @Patch('/return') 
    returnBook(@Body() data: updateBorrowDto, @Request() req) {
        return this.borrowService.return(data, req.user.userId)
    }


    @Get()
    findAllBorrow() {
        return this.borrowService.findAllBorrow()
    }

 
    @Get('/approved') 
    findAllApprovedBorrow() {
        return this.borrowService.findAllApprovedBorrow()
    }

    @Get('/pending')
    findAllPendingApprove() {
        return this.borrowService.findAllPendingApprove()
    }
}
