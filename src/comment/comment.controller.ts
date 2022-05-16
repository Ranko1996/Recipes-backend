/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CommentService } from './comment.service';
import { AddCommentDto } from './dto';

@UseGuards(JwtGuard)
@Controller('comment')
export class CommentController {
    constructor(private commentService: CommentService) {}
     
    @Get(':id')
    getComments(
        @Param('id', ParseIntPipe) post: number
    ) {
        return this.commentService.getComments(post)
    }

    @Post()
    postComment(
        @GetUser('id') userId: number, 
        @Body() dto: AddCommentDto
    ) {
        return this.commentService.postComment(userId, dto)
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteComment(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) commentId: number
    ) {
        return this.commentService.deleteComment(userId, commentId)
    }
}
