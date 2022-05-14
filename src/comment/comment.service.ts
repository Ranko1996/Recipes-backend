/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
    constructor(private prisma: PrismaService) {}

    getComments(post: number) {
        return this.prisma.comment.findMany({
           where: {
               postId: post
           }
        })
    }

    async postComment(userId, dto) {
        const comment = await this.prisma.comment.create({
            data: {
                userId: userId,
                ...dto,
            }
        })
        return comment
    }

    async deleteComment(userId, commentId) {
        const comment = await this.prisma.comment.findUnique({
            where: {
                id: commentId
            }
        })

        if(!comment || comment.userId !== userId) {
            throw new ForbiddenException('Access denied')
        }
        await this.prisma.comment.delete({
            where: {
                id: commentId
            }
        })
    }
}
