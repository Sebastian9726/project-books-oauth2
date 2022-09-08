import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyObject, ValidateNested, IsNotEmpty, IsString, IsNumber, IsArray, IsOptional } from "class-validator";



export class CreateBookDto {
      
      @IsNotEmpty()
      @IsString()
      @ApiProperty({ description: "id", type:String })
      id:string 

      @IsNotEmpty()
      @IsString()
      @ApiProperty({ description: "title",type:String })
      title:string 

      @IsOptional()
      @IsString()
      @ApiProperty({ description: "genre",type:String })
      genre: string;

      @IsOptional()
      @IsString()
      @ApiProperty({ description: "description",type:String })
      description: string;

      @IsNotEmpty()
      @IsString()
      @ApiProperty({ description: "author",type:String })
      author: string;

      @IsNotEmpty()
      @IsArray()
      @ApiProperty({ description: "publisher",type:String })
      publisher: string[];

      @IsNotEmpty()
      @IsNumber()
      @ApiProperty({ description: "pages",type:Number })
      pages: number;

      @IsNotEmpty()
      @IsString()
      @ApiProperty({ description: "image_url",type:String })
      image_url: string;
}