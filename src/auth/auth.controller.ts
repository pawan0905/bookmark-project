import { Body, Controller, Patch, Post, Get } from '@nestjs/common';
import { SignupDto, UpdatePassword, signInDto } from './authd-to/auth.dto';
import { User } from 'src/constants/auth.decorator';
import { AuthService } from './auth.service';
import { JsonWebTokenService } from 'src/services/jwt.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JsonWebTokenService,
  ) {}
  @ApiBearerAuth('JWT-auth')
  @Post()
  async signup(@Body() data: SignupDto) {
    return this.authService.signup(data);
  }
  @ApiBearerAuth('JWT-auth')
  @Post()
  async signin(@Body() data: signInDto) {
    console.log(data);
    return this.authService.signin(data);
  }
  @ApiBearerAuth('JWT-auth')
  @Patch('/change-password')
  async updatePassword(@Body() data: UpdatePassword, @User() user: any) {
    return this.authService.updatePassword(data, user);
  }
  @ApiBearerAuth('JWT-auth')
  @Get('/self')
  async getSelf(@User() user: any): Promise<any> {
    return this.authService.getSelf(user);
  }
}
