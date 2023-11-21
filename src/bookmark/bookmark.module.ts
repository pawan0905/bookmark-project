import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';
import { PrismaService } from 'src/services/prisma.services';
import { JwtModule } from '@nestjs/jwt';
import { JsonWebTokenService } from 'src/services/jwt.service';

@Module({
  imports: [JwtModule.register({ secret: process.env.SECRET_KEY })],
  providers: [BookmarkService, PrismaService, JsonWebTokenService],
  controllers: [BookmarkController],
})
export class BookmarkModule {}
