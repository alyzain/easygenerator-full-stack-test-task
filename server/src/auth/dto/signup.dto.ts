import { IsString, IsEmail, MinLength, Matches, IsNotEmpty, IsObject, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 20;

const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 50;

const passwordUpperCaseRegex = /[A-Z]/;
const passwordLowerCaseRegex = /[a-z]/;
const passwordNumberRegex = /\d/;
const passwordSpecialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

export class SignUpRequestDto {
    @ApiProperty({
        example: 'John Doe',
        description: 'The name of the user',
        minLength: MIN_NAME_LENGTH,
        maxLength: MAX_NAME_LENGTH,
    })
    @IsString()
    @IsNotEmpty({ message: 'Name cannot be empty' })
    @MinLength(MIN_NAME_LENGTH, { message: `Name must be at least ${MIN_NAME_LENGTH} characters long` })
    @MaxLength(MAX_NAME_LENGTH, { message: `Name must not exceed ${MAX_NAME_LENGTH} characters` })
    name: string;

    @ApiProperty({
        example: 'user@example.com',
        description: 'The email address of the user',
    })
    @IsNotEmpty({ message: 'Email cannot be empty' })
    @IsEmail({}, { message: 'Please provide a valid email address' })
    email: string;

    @ApiProperty({
        example: 'Password123!',
        description: 'The password of the user',
        minLength: MIN_PASSWORD_LENGTH,
        maxLength: MAX_PASSWORD_LENGTH,
        pattern: 'Must contain uppercase, lowercase, number, and special character',
    })
    @IsString()
    @IsNotEmpty({ message: 'Password cannot be empty' })
    @MinLength(MIN_PASSWORD_LENGTH, { message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long` })
    @MaxLength(MAX_PASSWORD_LENGTH, { message: `Password must not exceed ${MAX_PASSWORD_LENGTH} characters` })
    @Matches(passwordUpperCaseRegex, { message: 'Password must contain at least one uppercase letter' })
    @Matches(passwordLowerCaseRegex, { message: 'Password must contain at least one lowercase letter' })
    @Matches(passwordNumberRegex, { message: 'Password must contain at least one number' })
    @Matches(passwordSpecialCharRegex, { message: 'Password must contain at least one special character' })
    password: string;
}

class UserResponseDto {
    @ApiProperty({ example: 'user@example.com', description: 'The email of the user' })
    @IsString()
    email: string;

    @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
    @IsString()
    name: string;
}

export class SignUpResponseDto {
    @ApiProperty({ example: 201, description: 'The HTTP status code of the response' })
    @IsString()
    statusCode: number;

    @ApiProperty({ example: 'User registered successfully', description: 'The message of the response' })
    @IsString()
    message: string;

    @ApiProperty({
        description: 'The data object containing user information and access token',
        type: () => UserResponseDto,
    })
    @IsObject()
    data: {
        user: UserResponseDto;
        accessToken: string;
    };
}
