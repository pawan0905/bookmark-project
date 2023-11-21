import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { userDto } from './users-dto/users.dto';
import { User } from 'src/constants/auth.decorator';
import { AuthGuard } from 'src/guards/guards';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(AuthGuard)
  @Put(':id')
  updateUser(@User() user: any, @Body() data: userDto): Promise<any> {
    return this.usersService.updateUser(user['user'], data);
  }
}
