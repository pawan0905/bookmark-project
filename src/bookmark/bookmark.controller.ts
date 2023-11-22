import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Delete,
} from '@nestjs/common';
import { User } from 'src/constants/auth.decorator';
import { API_CONSTANTS } from 'src/constants/perpage';
import { BookmarkService } from './bookmark.service';
import {
  CreateBookmarkDto,
  UpdateBookmarkDto,
} from './bookmark-dto/bookmark.dto';
import { JsonWebTokenService } from 'src/services/jwt.service';

@Controller('bookmark')
export class BookmarkController {
  constructor(
    private readonly bookmarkService: BookmarkService,
    jwtService: JsonWebTokenService,
  ) {}
  @Get()
  async getAllBookmark(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe)
    page: number,
    @Query(
      'per_page',
      new DefaultValuePipe(API_CONSTANTS.perPage),
      ParseIntPipe,
    )
    perPage: number,
    @User() user: any,
  ): Promise<any> {
    return this.bookmarkService.getAllBookmarks(user['id'], page, perPage);
  }
  @Post()
  async createBookmark(
    @User() user: any,
    @Body() data: CreateBookmarkDto,
  ): Promise<any> {
    return this.bookmarkService.createBookmark(user['id'], data);
  }
  @Delete('/:id')
  async deleteBookmark(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.bookmarkService.deleteBookmark(id);
  }
  @Put('/:id')
  async updateBookmark(
    @Param('id') id: number,
    @User() user: any,
    @Body() data: UpdateBookmarkDto,
  ): Promise<any> {
    return this.bookmarkService.updateBookmark(id, user['id'], data);
  }
  @Get('/:id')
  async getBookmarkById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.bookmarkService.getBookmarkById(id);
  }
}
