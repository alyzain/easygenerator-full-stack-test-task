import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { LoggerService } from 'src/logger/logger.service';
import { UserProfileDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private logger: LoggerService,
  ) {}

  async getUserProfile(email: string): Promise<UserProfileDto> {
    this.logger.log(`Fetching profile for user with email: ${email}`);

    const user = await this.userModel
      .findOne({ email })
      .lean()
      .select('email name');

    if (!user) {
      this.logger.warn(`User with email ${email} not found.`);
      throw new NotFoundException('User not found');
    }

    this.logger.log(
      `Successfully fetched profile for user with email: ${email}`,
    );
    return user;
  }
}
