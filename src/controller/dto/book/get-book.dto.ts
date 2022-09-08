import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmptyObject, ValidateNested, IsNotEmpty, IsString, IsNumber, IsArray, IsOptional, IsInt } from "class-validator";



export class GetBookDto {

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @ApiProperty({ description: "skip",type:Number })
    skip: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @ApiProperty({ description: "limit",type:Number })
    limit: number;
}