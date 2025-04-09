import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpRequestDto } from './dto/signup-user.dto';
import { ConfigService } from '@nestjs/config';
import { SignInRequestDto } from './dto/signin-user.dto';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class AuthService {
    private saltRoundsFallback = 10;
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService,
        private configService: ConfigService,
        private logger: LoggerService,
    ) { }

    /**
     * Registers a new user, hashes their password, stores them in the database,
     * and returns a JWT token for authentication.
     * @param signUpDTO The sign-up data containing name, email, and password
     * @returns An object containing the user object, JWT token, and a success or faliure message
     */
    async signUp(request: SignUpRequestDto): Promise<{ user: { email: string; name: string }; accessToken: string; message: string }> {
        const { name, email, password } = request;
        this.logger.log(`Starting sign-up for user with email: ${email}`);

        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            this.logger.warn(`Sign-up attempt failed: User with email ${email} already exists.`);
            throw new ConflictException('User already exists with this email');
        }

        const saltRounds = Number(this.configService.get<number>('BCRYPT_SALT_ROUNDS')) ?? this.saltRoundsFallback;
        let hashedPassword: string;

        try {
            hashedPassword = await bcrypt.hash(password, saltRounds);
        } catch (error) {
            this.logger.error(`Error hashing password for user ${email}: ${error.message}`, error.stack);
            throw new InternalServerErrorException('Error creating user');
        }

        let user;
        try {
            user = await this.userModel.create({
                name,
                email,
                password: hashedPassword,
            });
            this.logger.log(`User ${email} registered successfully.`);
        } catch (error) {
            this.logger.error(`Error creating user with email ${email}: ${error.message}`, error.stack);
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

    /**
     * Signs in a user by verifying their credentials and generating a JWT token.
     * @param signInDTO The sign-in data containing email and password
     * @returns An object containing the user object and a JWT token if authentication is successful
     */
    async signIn(request: SignInRequestDto): Promise<{ user: { email: string; name: string }; accessToken: string; message: string }> {
        const { email, password } = request;
        this.logger.log(`Starting sign-in for user with email: ${email}`);
        
        const user = await this.userModel.findOne({ email });
        if (!user) {
            this.logger.warn(`Sign-in attempt failed: User with email ${email} not found.`);
            throw new UnauthorizedException('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            this.logger.warn(`Sign-in attempt failed: Incorrect password for ${email}.`);
            throw new UnauthorizedException('Invalid email or password');
        }

        this.logger.log(`User ${email} signed in successfully.`);
        const payload = { id: user._id, email: user.email };
        const accessToken = this.jwtService.sign(payload);

        return {
            user: { email: user.email, name: user.name },
            accessToken,
            message: 'User signed in successfully',
        };
    }
}