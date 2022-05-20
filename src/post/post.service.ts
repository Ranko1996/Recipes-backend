/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto, EditPostDto } from './dto';

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService) {}
   
    getPosts(userId: number) {
        return this.prisma.post.findMany({
            where: {
                userId: userId
            }
        })     
    }

    getAllPosts(userId: number){
        return this.prisma.post.findMany()
    }

    getPost(userId: number, postId: number) {
        return this.prisma.post.findFirst({
            where: {
                id: postId,
                userId,
            }
        })
    }

    getPostPublic(postId: number) {
        return this.prisma.post.findFirst({
            where: {
                id: postId,
            }
        })
    }

    async createPost(userId: number, dto: CreatePostDto) {
        const post = await this.prisma.post.create({
            data: {
                userId: userId,
                ...dto
            }
        })
        return post
    }

    async editPost(userId: number, postId: number, dto: EditPostDto) {
        const post = await this.prisma.post.findUnique({
            where: {
                id: postId
            }
        })
        if(!post || post.userId !== userId) {
            throw new ForbiddenException('Access to this post denied')
        }

        return this.prisma.post.update({
            where: {
                id: postId,
            }, 
            data: {
                ...dto,
            }
        })
    }

    async deletePost(userId: number, postId: number) {
        const post = await this.prisma.post.findUnique({
            where: {
                id: postId
            }
        })
        if(!post || post.userId !== userId) {
            throw new ForbiddenException('Access to this post denied')
        }
        await this.prisma.post.delete({
            where: {
                id: postId,
            }
        })
    }
}{}
