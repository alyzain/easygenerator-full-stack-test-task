import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../auth/schemas/user.schema';
import { Model } from 'mongoose';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private logger: LoggerService,
  ) { }

  async getUserProfile(email: string) {
    this.logger.log(`Fetching profile for user with email: ${email}`);

    const user = await this.userModel.findOne({ email }).select('email name');
    if (!user) {
      this.logger.warn(`User with email ${email} not found.`);
      throw new Error('User not found');
    }

    this.logger.log(`Successfully fetched profile for user with email: ${email}`);
    return user;
  }
}