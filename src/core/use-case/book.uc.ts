import { Injectable } from '@nestjs/common';
import { IBook } from '../entity/book/book.entity';

@Injectable()
export abstract class IBookUc{

    abstract createBooks(book:IBook): any;

}