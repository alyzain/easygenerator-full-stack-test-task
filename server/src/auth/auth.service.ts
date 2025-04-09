import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpRequestDto } from './dto/signup-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    private saltRoundsFallback = 10;
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    /**
     * Registers a new user, hashes their password, stores them in the database,
     * and returns a JWT token for authentication.
     * @param signUpDTO The sign-up data containing name, email, and password
     * @returns An object containing the user object, JWT token, and a success or faliure message
     */
    async signUp(request: SignUpRequestDto): Promise<{ user: { email: string; name: string }; accessToken: string; message: string }> {
        const { name, email, password } = request;

        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new ConflictException('User already exists with this email');
        }

        const saltRounds = Number(this.configService.get<number>('BCRYPT_SALT_ROUNDS')) ?? this.saltRoundsFallback;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        let user;
        try {
            user = await this.userModel.create({
                name,
                email,
                password: hashedPassword,
            });
        } catch (error) {
            throw new InternalServerErrorException('Error creating user');
        }

        const payload = { id: user._id, email: user.email };
        const accessToken = this.jwtService.sign(payload);

        return {
            user: { email: user.email, name: user.name },
            accessToken,
            message: 'User registered successfully',
        };
    }
}