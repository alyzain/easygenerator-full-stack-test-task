import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpRequestDto, SignUpResponseDto } from './dto/signup-user.dto';
import { SignInRequestDto, SignInResponseDto } from './dto/signin-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    @UsePipes(new ValidationPipe({ transform: true }))
    async signUp(@Body() request: SignUpRequestDto): Promise<SignUpResponseDto> {
        try {
            const response = await this.authService.signUp(request);
            return {
                statusCode: 201,
                message: response.message,
                data: {
                    user: response.user,
                    accessToken: response.accessToken,
                },
            };
        } catch (error) {
            throw error;
        }
    }

    @Post('/signin')
    @UsePipes(new ValidationPipe({ transform: true }))
    async signIn(@Body() request: SignInRequestDto): Promise<SignInResponseDto> {
        try {
            const response = await this.authService.signIn(request);
            return {
                statusCode: 200,
                message: response.message,
                data: {
                    user: response.user,
                    accessToken: response.accessToken,
                },
            };
        } catch (error) {
            throw error;
        }
    }
}
