import { Injectable } from '@nestjs/common';

import {Request as RequestExpress,Response as ResponseExpress} from 'express';
import { CreateBookDto } from '../dto/book/create-book.dto';
import { GetBookDto } from '../dto/book/get-book.dto';
import { UpdateBookDto } from '../dto/book/update-book.dto';

@Injectable()
export abstract class IServiceBook {

  abstract createBooks(bookDto: CreateBookDto, response:ResponseExpress): Promise<any>;// TIPAR DEL TIPO

  abstract getBooks( data:any, response:ResponseExpress): Promise<any>;// TIPAR DEL TIPO

  abstract getBookById(_id:string, response:ResponseExpress): Promise<any>;// TIPAR DEL TIPO

  abstract updateBooks(_id:string,data:GetBookDto,bookDto: UpdateBookDto, response:ResponseExpress): Promise<any>;// TIPAR DEL TIPO
  
  abstract deleteBookById(_id:string, response:ResponseExpress): Promise<any>;// TIPAR DEL TIPO
}