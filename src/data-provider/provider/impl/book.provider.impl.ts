import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model,Types } from 'mongoose';
import { IBookProvider } from '../book.provider';
import { IBook } from 'src/core/entity/book/book.entity';
import { BookModel } from 'src/data-provider/model/book/book.model';


@Injectable()
export class BookProvider implements IBookProvider {

    constructor(
        @InjectModel(BookModel.name)
        private readonly bookModel: Model<BookModel>,

    ) { }
    async deleteBookById(id: string): Promise<any> {
        try {
            const filter = {_id:new Types.ObjectId(id)}
            const valor =await this.bookModel.deleteOne(filter)
            return valor
        } catch (e) {
            return e
        }
    }
    async getBookById(id: string): Promise<any> {
        try {
            const filter = {_id:new Types.ObjectId(id)}
            
            const valor =await this.bookModel.findOne(filter)
            return valor
        } catch (e) {
            return e
        }
    }
    async updateBook(filter: any, data: any): Promise<IBook> {
        try {
            return await this.bookModel.findByIdAndUpdate(filter,data)
        } catch (e) {
            return e
        }
    }
    async createBook(book: IBook): Promise<any> {
        try {
            return await this.bookModel.insertMany(book)
        } catch (e) {
            return e
        }
    }
    async getBook(filter: any): Promise<any> {
        try {

            const valor =await this.bookModel.find().limit(filter.limit).skip(filter.skip)
            return valor 
        } catch (e) {
            return e
        }
    }


}

