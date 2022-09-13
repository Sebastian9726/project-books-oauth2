import { Controller, Headers, Get, Param, ParseIntPipe, Put, Query, Post, Body, Res, UseFilters, Delete, UseGuards, } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import generalConfig from 'src/common/configuration/general.config';
import { Swagger } from 'src/common/utils/enums/message.enum';
import { IServiceBook } from '../service/book.service';
import { Request as RequestExpress, Response as ResponseExpress } from 'express';
import { GetBookDto } from '../dto/book/get-book.dto';
import { CreateBookDto } from '../dto/book/create-book.dto';
import { UpdateBookDto } from '../dto/book/update-book.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { JwtAuthGuard } from '../guards/jw-auth.guard';



@ApiTags(generalConfig.book)
@Controller(`${generalConfig.book}`)
export class BookController {
  constructor(
    private _serviceBook: IServiceBook,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  createBooks(@Body() book: CreateBookDto, @Res() res: ResponseExpress) {
    return this._serviceBook.createBooks(book, res)
  }

  @Get()
  getBooks(
    @Query() data: GetBookDto,
    @Res() res: ResponseExpress) {
    return this._serviceBook.getBooks( data, res)
  }

  @Get('/:id')
  getBookById(
    @Res() res: ResponseExpress,
    @Query() data: GetBookDto,
    @Param('id') id: string
    ){
      return this._serviceBook.getBookById(id, res)
  }
  
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  updateBook(
    @Param('id') _id: string,
    @Query() data: GetBookDto,
    @Body() book: UpdateBookDto,
    @Res() res: ResponseExpress) {
    return this._serviceBook.updateBooks(_id, data, book, res)

  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteById(
    @Res() res: ResponseExpress,
    @Query() data: GetBookDto,
    @Param('id') id: string
    ){
      return this._serviceBook.deleteBookById(id, res)
  }

}