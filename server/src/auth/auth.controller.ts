import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpRequestDto, SignUpResponseDto } from './dto/signup.dto';
import { SignInRequestDto, SignInResponseDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    @UsePipes(new ValidationPipe({ transform: true }))
    async signUp(@Body() request: SignUpRequestDto): Promise<SignUpResponseDto> {
        return await this.authService.signUp(request);
    }

    @Post('/signin')
    @UsePipes(new ValidationPipe({ transform: true }))
    async signIn(@Body() request: SignInRequestDto): Promise<SignInResponseDto> {
        return await this.authService.signIn(request);
    }
}
