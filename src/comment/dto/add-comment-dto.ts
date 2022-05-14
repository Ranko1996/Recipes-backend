/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddCommentDto {
    @IsString()
    @IsNotEmpty()
    content: string

    @IsNumber()
    @IsNotEmpty()
    postId: number
}