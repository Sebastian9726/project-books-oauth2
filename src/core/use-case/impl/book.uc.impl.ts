import { HttpException, HttpStatus, Injectable, MethodNotAllowedException } from '@nestjs/common';
import { IBook } from 'src/core/entity/book/book.entity';
import { IBookProvider } from 'src/data-provider/provider/book.provider';
import { IBookUc } from '../book.uc';



@Injectable()
export class BookUcimpl implements IBookUc {
    constructor(
        public readonly _serviceBookProvider: IBookProvider,
    ) { }
    async updateBooks(data:any,book: any): Promise<any> {
        var filter = {
            active_at: true,
            delete_at: false,
            _id: data.id,
            author: book.author ? data.id : '',
        }
        const UPDATE_BOOK = await this._serviceBookProvider.updateBook(filter,book)
        if (!UPDATE_BOOK) {
            return new Error('Error en base de datos')
            }
        return UPDATE_BOOK
    }
    async getBooks(data: any) : Promise<any>{
        if (!data) {
            data = {
                active_at: true,
                delete_at: false
            }
        }
        const GET_BOOK = await this._serviceBookProvider.getBook(data)
        if (!GET_BOOK) {
            return new Error('Error en base de datos')
            }
        return GET_BOOK
    }
    async createBooks(book: IBook): Promise<any> {
        /*

          */
        const CREATE_BOOK = await this._serviceBookProvider.createBook(book)

        if (!CREATE_BOOK) {
            return new Error('Error en base de datos')
            }
        return CREATE_BOOK
        
    }
}
