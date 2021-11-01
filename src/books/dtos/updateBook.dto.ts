import { IsBoolean, IsOptional, IsString, MaxLength } from "class-validator"

export class updateBookDto {
    @IsString()
    @IsOptional()
    @MaxLength(30)
    title: string

    @IsString()
    @IsOptional()
    @MaxLength(20)
    author: string

    @IsBoolean()
    @IsOptional()
    isBorrowed: boolean
}