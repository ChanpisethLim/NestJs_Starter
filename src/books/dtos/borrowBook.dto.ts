import { IsNotEmpty, IsNumber } from "class-validator"

export class borrowBookDto {
    @IsNumber()
    @IsNotEmpty()
    bookId: number
}