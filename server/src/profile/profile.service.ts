import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../auth/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async getUserProfile(email: string) {
    const user = await this.userModel.findOne({ email }).select('email name');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}