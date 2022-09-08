import { Injectable } from '@nestjs/common';
import { IBook } from 'src/core/entity/book/book.entity';


@Injectable()
export abstract class IBookProvider {

    abstract  updateBook(filter: any, data:any ): Promise<IBook>;
    
    abstract  createBook(book: IBook): Promise<any>;

    abstract  getBook(filter: any): Promise<any>;
}