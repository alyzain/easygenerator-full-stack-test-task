import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserProfileDto } from './dto/user.dto';
import { JwtPayload } from 'src/auth/jwt-payload.interface';
import { CurrentUser } from 'src/auth/current-user.decorator';

@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
    schema: {
      example: {
        _id: '1234567890abcdef12345678',
        name: 'John Doe',
        email: 'user@example.com',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized access',
    schema: {
      example: {
        message: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  async getProfile(@CurrentUser() user: JwtPayload): Promise<UserProfileDto> {
    return this.usersService.getUserProfile(user.email);
  }
}
