/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from "class-validator"

export class EditPostDto {
    @IsString()
    @IsOptional()
    title?: string
 
    @IsString()
    @IsOptional()
    image?: string 

    @IsString()
    @IsOptional()
    description?: string
}