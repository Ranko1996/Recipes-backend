/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CommentService } from './comment.service';
import { AddCommentDto } from './dto';

@UseGuards(JwtGuard)
@Controller('comment')
export class CommentController {
    constructor(private commentService: CommentService) {}
     
    @Get()
    getComments(
        @Body('id', ParseIntPipe) postId: number
    ) {
        return this.commentService.getComments(postId)
    }

    @Post()
    postComment(
        @GetUser('id') userId: number, 
        @Body('id', ParseIntPipe) postId: number,
        @Body() dto: AddCommentDto
    ) {
        return this.commentService.postComment(userId, postId, dto)
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete()
    deleteComment(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) commentId: number
    ) {
        return this.commentService.deleteComment(userId, commentId)
    }
}
