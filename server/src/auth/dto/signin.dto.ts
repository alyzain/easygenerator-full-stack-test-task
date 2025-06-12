import { IsEmail, IsString, IsNotEmpty, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInRequestDto {
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
  })
  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;
}

class UserResponseDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  @IsString()
  email: string;

  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @IsString()
  name: string;
}

export class SignInResponseDto {
  @ApiProperty({
    example: 200,
    description: 'The HTTP status code of the response',
  })
  @IsString()
  statusCode: number;

  @ApiProperty({
    example: 'User signed in successfully',
    description: 'The message of the response',
  })
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
