import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/schemas/user.schema';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    LoggerModule
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }
