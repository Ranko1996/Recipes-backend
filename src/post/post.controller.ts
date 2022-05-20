/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreatePostDto, EditPostDto } from './dto';
import { PostService } from './post.service';

@UseGuards(JwtGuard)
@Controller('post')
export class PostController {
    constructor(private postService: PostService) {}

    @Get('all')
    getAllPosts(@GetUser('id') userId: number){
        return this.postService.getAllPosts(userId)
    }

    @Get()
    getPosts(@GetUser('id') userId: number) {
        return this.postService.getPosts(userId)
    }

    @Get(':id')
    getPost(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) postId: number,
    ) {
        return this.postService.getPost(userId, postId)
    }

    @Get('all/:id')
    getPostPublic(
        @Param('id', ParseIntPipe) postId: number,
    ) {
        return this.postService.getPostPublic(postId)
    }

    @Post()
    createPost(
        @GetUser('id') userId: number,
        @Body() dto: CreatePostDto,
    ) {
        return this.postService.createPost(userId, dto)
    }

    @Patch(':id')
    editPost(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) postId: number,
        @Body() dto: EditPostDto,    
    ) {
        return this.postService.editPost(userId, postId, dto)
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deletePost(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) postId: number
    ) {
            return this.postService.deletePost(userId, postId)
        }
}
