import { IsNotEmpty, IsNumber } from "class-validator"

export class updateBorrowDto {
    @IsNumber()
    @IsNotEmpty()
    borrowId: number

    @IsNumber()
    @IsNotEmpty()
    bookId: number
}