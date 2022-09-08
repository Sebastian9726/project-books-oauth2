import { HttpException, HttpStatus, Injectable, MethodNotAllowedException } from '@nestjs/common';
import { IBook } from 'src/core/entity/book/book.entity';
import { IBookProvider } from 'src/data-provider/provider/book.provider';
import { IBookUc } from '../book.uc';



@Injectable()
export class BookUcimpl implements IBookUc {
    constructor(
        public readonly _serviceBookProvider: IBookProvider,
    ) { }
    async deleteBookById(id: string): Promise<any> {
        const DELETE_BOOK = await this._serviceBookProvider.deleteBookById(id)
        if (!DELETE_BOOK) {
            return new Error('Error en base de datos')
        }
        return DELETE_BOOK
    }
    async getBookById(id: string): Promise<any> {
        const GET_BY_ID_BOOK = await this._serviceBookProvider.getBookById(id)
        if (!GET_BY_ID_BOOK) {
            return new Error('Error en base de datos')
        }
        return GET_BY_ID_BOOK
    }
    async updateBooks(data: any, book: any): Promise<any> {
        var filter = {
            active_at: true,
            delete_at: false,
            _id: data.id,
            // author: book.author ? data.id : '',
        }
        const UPDATE_BOOK = await this._serviceBookProvider.updateBook(filter, book)
        if (!UPDATE_BOOK) {
            return new Error('Error en base de datos')
        }
        return UPDATE_BOOK
    }
    async getBooks(data: any): Promise<any> {
        var dataEdit
        if (data.id) {
            dataEdit = {
                _id: data._id
            }

        }
        dataEdit = data
        const GET_BOOK = await this._serviceBookProvider.getBook(dataEdit)
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
