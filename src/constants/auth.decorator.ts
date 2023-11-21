import { ExecutionContext } from '@nestjs/common';
import { SetMetadata, createParamDecorator } from '@nestjs/common/decorators';
import { JwtService } from '@nestjs/jwt';

const jwtService = new JwtService();

export const User = createParamDecorator(
  async (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];
    console.log(token);
    const user = await jwtService.verifyAsync(token, {
      secret: process.env.SECRET_KEY,
    });
    console.log(user);
    return user;
  },
);

export const permission = (permission: any) =>
  SetMetadata('PERMISSION', permission);
