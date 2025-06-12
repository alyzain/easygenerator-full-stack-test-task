import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserProfileDto {
    @ApiProperty({
        example: 'user@example.com',
        description: 'The email address of the user',
    })
    @IsString()
    email: string;
  
    @ApiProperty({
        example: 'John Doe',
        description: 'The name of the user',
    })
    @IsString()
    name: string;
}