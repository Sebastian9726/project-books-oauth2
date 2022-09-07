import { Injectable } from '@nestjs/common';
import { BookDto } from '../dto/book/book.dto';
import {Request as RequestExpress,Response as ResponseExpress} from 'express';

@Injectable()
export abstract class IServiceBook {

  abstract createBooks(bookDto: BookDto, response:ResponseExpress): Promise<any>;// TIPAR DEL TIPO
  
}