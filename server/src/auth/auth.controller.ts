import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpRequestDto, SignUpResponseDto } from './dto/signup.dto';
import { SignInRequestDto, SignInResponseDto } from './dto/signin.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({
        status: 201,
        description: 'User registered successfully',
        schema: {
            example: {
                statusCode: 201,
                message: 'User registered successfully',
                data: {
                    user: {
                        email: 'user@example.com',
                        name: 'John Doe',
                    },
                    accessToken: '<Access Token>',
                },
            },
        },
    })
    @ApiResponse({
        status: 409,
        description: 'User already exists with this email',
        schema: {
            example: {
                message: 'User already exists with this email',
                error: 'Conflict',
                statusCode: 409,
            },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Validation error',
        schema: {
            example: {
                message: ['Please provide a valid email address'],
                error: 'Bad Request',
                statusCode: 400,
            },
        },
    })
    @UsePipes(new ValidationPipe({ transform: true }))
    async signUp(@Body() request: SignUpRequestDto): Promise<SignUpResponseDto> {
        return await this.authService.signUp(request);
    }

    @Post('/signin')
    @ApiOperation({ summary: 'Authenticate a user' })
    @ApiResponse({
        status: 200,
        description: 'User authenticated successfully',
        schema: {
            example: {
                statusCode: 200,
                message: 'User authenticated successfully',
                data: {
                    user: {
                        email: 'user@example.com',
                        name: 'John Doe',
                    },
                    accessToken: '<Access Token>',
                },
            },
        },
    })
    @ApiResponse({
        status: 401,
        description: 'Invalid credentials',
        schema: {
            example: {
                message: 'Invalid email or password',
                error: 'Unauthorized',
                statusCode: 401,
            },
        },
    })
    @UsePipes(new ValidationPipe({ transform: true }))
    async signIn(@Body() request: SignInRequestDto): Promise<SignInResponseDto> {
        return await this.authService.signIn(request);
    }
}
