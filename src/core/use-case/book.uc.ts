import { Injectable } from '@nestjs/common';
import { IBook } from '../entity/book/book.entity';

@Injectable()
export abstract class IBookUc{

    abstract createBooks(book:IBook): Promise<any>;;

    abstract getBooks(data:any): Promise<any>;;

    abstract updateBooks(data:any,book:any):Promise<any>;
    
    abstract getBookById(id:string):Promise<any>;
    
    abstract deleteBookById(id:string):Promise<any>;

}