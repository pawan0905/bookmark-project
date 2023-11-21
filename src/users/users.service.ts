import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.services';
import { userDto } from './users-dto/users.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async updateUser(id: number, data: userDto): Promise<any> {
    const checkUser = await this.prisma.users.findFirst({
      where: {
        id: id,
        is_deleted: false,
      },
    });
    if (!checkUser) {
      throw new HttpException('User not found', 404);
    }
    const updateUser = await this.prisma.users.update({
      where: { id: id },
      data: {
        name: data.name,
        email: data.email,
        phone_number: data.phone_number,
      },
    });
    return updateUser;
  }
}
