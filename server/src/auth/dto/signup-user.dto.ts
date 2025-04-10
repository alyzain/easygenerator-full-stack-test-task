import { IsString, IsEmail, MinLength, Matches, IsNotEmpty, IsObject, IsOptional, MaxLength } from 'class-validator';

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 20;

const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 50;

const passwordUpperCaseRegex = /[A-Z]/;
const passwordLowerCaseRegex = /[a-z]/;
const passwordNumberRegex = /\d/;
const passwordSpecialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

export class SignUpRequestDto {
    @IsString()
    @IsNotEmpty({ message: 'Name cannot be empty' })
    @MinLength(MIN_NAME_LENGTH, { message: `Name must be at least ${MIN_NAME_LENGTH} characters long` })
    @MaxLength(MAX_NAME_LENGTH, { message: `Name must not exceed ${MAX_NAME_LENGTH} characters` })
    name: string;

    @IsNotEmpty({ message: 'Email cannot be empty' })
    @IsEmail({}, { message: 'Please provide a valid email address' })
    email: string;

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
    @IsString()
    email: string;

    @IsString()
    name: string;
}

export class SignUpResponseDto {
    @IsString()
    statusCode: number;

    @IsString()
    message: string;

    @IsObject()
    data: {
        user: UserResponseDto;
        accessToken: string;
    };
}
