import { HttpStatus, Injectable,ArgumentsHost,Res } from '@nestjs/common';
import { BookDto } from 'src/controller/dto/book/book.dto';
import { IServiceBook } from '../book.service';
import {Request as RequestExpress,Response as ResponseExpress} from 'express';
import { IBookUc } from 'src/core/use-case/book.uc';

@Injectable()
export class ServiceBook implements IServiceBook {
 host: ArgumentsHost
 response:Response
    constructor(
        public readonly _bookUc: IBookUc

     ) { 
               // public readonly _addressComplement: IBookUc
    }
    async createBooks(bookDto: BookDto, Response:ResponseExpress): Promise<any> {


        const CREATE_BOOK = this._bookUc.createBooks(bookDto)
       
       if(CREATE_BOOK  instanceof Error){
        Response
        .status(404)
        .send(CREATE_BOOK)
       }
        Response
        .status(200)
        .send("hola mundo")
    }
        
}