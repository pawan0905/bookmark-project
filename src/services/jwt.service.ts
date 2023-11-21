import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JsonWebTokenService {
  constructor(private readonly jwtService: JwtService) {}
  async createJwtToken(user: object): Promise<any> {
    try {
      const accessToken = await this.jwtService.sign(user, {
        secret: process.env.SECRET_KEY,
      });
      return accessToken;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
  async verifyJwtToken(token: string): Promise<any> {
    console.log('token', token);
    const user = await this.jwtService.verify(token, {
      secret: process.env.SECRET_KEY,
    });
    console.log('user', user);
    return user;
  }
}
