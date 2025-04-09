import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpRequestDto, SignUpResponseDto } from './dto/signup-user.dto';

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
            return {
                statusCode: error.getStatus(),
                message: error.message,
            };
        }
    }
}
