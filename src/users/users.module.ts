import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/services/prisma.services';
import { JsonWebTokenService } from 'src/services/jwt.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({ secret: process.env.SECRET_KEY })],
  providers: [UsersService, PrismaService, JsonWebTokenService],
  controllers: [UsersController],
})
export class UsersModule {}
