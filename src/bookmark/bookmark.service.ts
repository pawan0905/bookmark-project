import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.services';
import { Utility } from 'src/constants/utility';
import {
  CreateBookmarkDto,
  UpdateBookmarkDto,
} from './bookmark-dto/bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async getBookmarkById(id: number): Promise<any> {
    console.log(id);
    const checkBookmarkById = await this.prisma.bookmark.findFirst({
      where: {
        id: id,
        is_deleted: false,
      },
    });
    if (!checkBookmarkById) {
      throw new HttpException('Bookmark not found', 404);
    }
    return { data: checkBookmarkById };
  }
  async getAllBookmarks(
    id: number,
    page: number,
    perPage: number,
  ): Promise<any> {
    //console.log(id, page, perPage);
    const totalCount = await this.prisma.bookmark.count({
      where: {
        userId: id,
        is_deleted: false,
      },
    });
    console.log(totalCount);
    const list = await this.prisma.bookmark.findMany({
      skip: page * perPage,
      take: perPage,
      where: {
        userId: id,
        is_deleted: false,
      },
    });
    return Utility.getPaginatedFormatData(list, totalCount, page, perPage);
  }
  async createBookmark(id: number, data: CreateBookmarkDto): Promise<any> {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        userId: id,
        title: data.title,
        description: data.description,
        link: data.link,
      },
    });
    return { data: bookmark };
  }
  async updateBookmark(
    id: number,
    userId: number,
    data: UpdateBookmarkDto,
  ): Promise<any> {
    const checkBookmark = await this.prisma.bookmark.findFirst({
      where: {
        id: id,
        is_deleted: false,
      },
    });
    // check if user owns the bookmark
    if (!checkBookmark) {
      throw new HttpException('Bookmark not found', 404);
    }
    const updateBookmark = await this.prisma.bookmark.update({
      where: {
        id: id,
      },
      data: {
        userId: userId,
        description: data.description,
        title: data.title,
        link: data.link,
      },
    });
    return { data: updateBookmark };
  }
  async deleteBookmark(id: number): Promise<any> {
    const checkBookmark = await this.prisma.bookmark.findFirst({
      where: {
        id: id,
        is_deleted: false,
      },
    });
    if (!checkBookmark) {
      throw new HttpException('Bookmark not found', 404);
    }
    await this.prisma.bookmark.update({
      where: {
        id: id,
      },
      data: { is_deleted: true, updated_at: new Date() },
    });
    return { data: { message: 'bookmark deleted successfully' } };
  }
}
