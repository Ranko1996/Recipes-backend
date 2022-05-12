/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    title: string
 
    @IsString()
    @IsOptional()
    image?: string 

    @IsString()
    @IsOptional()
    description?: string

}