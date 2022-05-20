/* eslint-disable prettier/prettier */
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddCommentDto {
    @IsString()
    @IsNotEmpty()
    content: string

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value))
    postId: number

    @IsNotEmpty()
    @IsString()
    userMail: string
}