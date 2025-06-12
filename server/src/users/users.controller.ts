import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserProfileDto } from './dto/user.dto';
import { JwtPayload } from 'src/auth/jwt-payload.interface';
import { CurrentUser } from 'src/auth/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  async getProfile(@CurrentUser() user: JwtPayload): Promise<UserProfileDto> {
    return this.usersService.getUserProfile(user.email);
  }
}