import {Controller, Headers, Get, Param, ParseIntPipe, Put, Query, Post, Body, Res, UseFilters, } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import generalConfig from 'src/common/configuration/general.config';
import { Swagger } from 'src/common/utils/enums/message.enum';

import { BookDto } from '../dto/book/book.dto'
import { IServiceBook } from '../service/book.service';
import {Request as RequestExpress,Response as ResponseExpress} from 'express';
import { HttpExceptionFilter } from '../filter/http-expcion.filter';


@ApiTags(generalConfig.controllerCoverageAddressComplement)
@Controller(`${generalConfig.controllerCoverageAddressComplement}`)
export class  BookController {
  constructor(
    private _serviceBook: IServiceBook,
  ) { }

  @Post()
  @UseFilters(HttpExceptionFilter)
  @ApiOperation({operationId:'consultAddressComplement',description: Swagger.POST_ADDRESS_DESCRIPTION})
  @ApiBody({ type: BookDto, description:'schemas GeographicAdDto' })
 // @ApiHeader({name: 'channel',description: 'channel identifier'})
  @ApiResponse({ type: BookDto })
  consultAddressComplement(@Body() book: BookDto,@Res() res: ResponseExpress) {
    return this._serviceBook.createBooks(book,res)
  }

}