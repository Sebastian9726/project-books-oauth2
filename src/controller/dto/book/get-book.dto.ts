import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyObject, ValidateNested, IsNotEmpty, IsString, IsNumber, IsArray, IsOptional } from "class-validator";



export class GetBookDto {

    @IsOptional()
    @IsNumber()
    @ApiProperty({ description: "author",type:String })
    skip: number;

    @IsOptional()
    @IsNumber()
    @ApiProperty({ description: "author",type:String })
    limit: number;
}