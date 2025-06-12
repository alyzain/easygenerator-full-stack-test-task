import { IsString } from "class-validator";

export class UserProfileDto {
    @IsString()
    email: string;
  
    @IsString()
    name: string;
  }