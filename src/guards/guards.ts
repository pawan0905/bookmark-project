import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/services/prisma.services';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const reqBody = context.switchToHttp().getRequest();
    const token = reqBody.headers.authorization?.split(' ')[1];
    if (!Boolean(token)) {
      throw new HttpException('attach bearer token ', 404);
    }
    const dectok = this.jwtService.verify(token, {
      secret: process.env.SECRET_KEY,
    });
    const user = await this.prisma.users.findMany({
      where: {
        id: dectok.id,
      },
    });
    if (user) {
      return true;
    } else {
      throw new HttpException('access denied for user ', 403);
    }
  }
}
