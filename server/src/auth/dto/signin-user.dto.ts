import { IsEmail, IsString, IsNotEmpty, IsObject, IsOptional } from 'class-validator';

export class SignInRequestDto {
    @IsNotEmpty({ message: 'Email cannot be empty' })
    @IsEmail({}, { message: 'Please provide a valid email address' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Password cannot be empty' })
    password: string;
}

class UserResponseDto {
    @IsString()
    email: string;

    @IsString()
    name: string;
}

export class SignInResponseDto {
    @IsString()
    statusCode: number;

    @IsString()
    message: string;

    @IsObject()
    @IsOptional()
    data?: {
        user: UserResponseDto;
        accessToken: string;
    };
}