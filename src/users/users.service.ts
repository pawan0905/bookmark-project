import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.services';
import { userDto } from './users-dto/users.dto';
import { JsonWebTokenService } from 'src/services/jwt.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JsonWebTokenService,
  ) {}
  async updateUser(user: any, data: userDto): Promise<any> {
    const checkUser = await this.prisma.users.findFirst({
      where: {
        id: user.id,
        is_deleted: false,
      },
    });
    if (!checkUser) {
      throw new HttpException('User not found', 404);
    }
    const updateUser = await this.prisma.users.update({
      where: { id: user.id, is_deleted: false },
      data: {
        name: data.name,
        email: data.email,
        phone_number: data.phone_number,
      },
    });
    return updateUser;
  }
}
