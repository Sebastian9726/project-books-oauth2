import { Controller, Headers, Get, Param, ParseIntPipe, Put, Query, Post, Body, Res, UseFilters, } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import generalConfig from 'src/common/configuration/general.config';
import { Swagger } from 'src/common/utils/enums/message.enum';
import { IServiceBook } from '../service/book.service';
import { Request as RequestExpress, Response as ResponseExpress } from 'express';
import { GetBookDto } from '../dto/book/get-book.dto';
import { CreateBookDto } from '../dto/book/create-book.dto';
import { UpdateBookDto } from '../dto/book/update-book.dto';



@ApiTags(generalConfig.book)
@Controller(`${generalConfig.book}`)
export class BookController {
  constructor(
    private _serviceBook: IServiceBook,
  ) { }


  @Post()
  createBooks(@Body() book: CreateBookDto, @Res() res: ResponseExpress) {
    return this._serviceBook.createBooks(book, res)
  }

  @Get()
  @ApiResponse({ type: CreateBookDto })
  getBooks(
    @Query() data:GetBookDto ,
    @Res() res: ResponseExpress) {
    return this._serviceBook.getBooks(null, data,res) 
  }

  @Get(':id')
  @ApiOperation({ operationId: 'consultAddressComplement', description: Swagger.GET_BOOKS })
  getBookById(
    @Param('id') id: string,
    @Res() res: ResponseExpress) {
    return `This action returns a #${id} cat`;

  }

  @Put(':id')
  updateBook(
    @Param('id') id: string,
    @Query() data:GetBookDto,
    @Body() book: UpdateBookDto,
    @Res() res: ResponseExpress) {
    return this._serviceBook.updateBooks(id,data,book,res)

  }

}