import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyObject, ValidateNested, IsNotEmpty, IsString, IsNumber, IsArray, IsOptional } from "class-validator";



export class CreateUserDto {
      
      @IsNotEmpty()
      @IsString()
      @ApiProperty({ description: "name",type:String })
      name:string 

      @IsOptional()
      @IsString()
      @ApiProperty({ description: "genre",type:String })
      genre: string;


      @IsNotEmpty()
      @IsString()
      @ApiProperty({ description: "user",type:String })
      username: string;

      @IsNotEmpty()
      @IsString()
      @ApiProperty({ description: "password",type:String })
      password: string;
}