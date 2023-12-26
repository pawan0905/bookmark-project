import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma.services';
import { JsonWebTokenService } from './services/jwt.service';
import { UsersModule } from './users/users.module';
import { BookmarkService } from './bookmark/bookmark.service';
import { JwtModule } from '@nestjs/jwt';
import { BookmarkModule } from './bookmark/bookmark.module';
import { UsersService } from './users/users.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    BookmarkModule,
    UsersModule,
    JwtModule.register({ secret: process.env.SECRET_KEY }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JsonWebTokenService,
    PrismaService,
    BookmarkService,
    UsersService,
  ],
})
export class AppModule {}
