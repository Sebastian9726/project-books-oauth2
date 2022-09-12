import { HttpStatus, Injectable, ArgumentsHost, Res } from '@nestjs/common';
import { CreateBookDto } from 'src/controller/dto/book/create-book.dto';
import { IServiceBook } from '../book.service';
import { Request as RequestExpress, Response as ResponseExpress } from 'express';
import { IBookUc } from 'src/core/use-case/book.uc';
import { Console } from 'console';
import { UpdateBookDto } from 'src/controller/dto/book/update-book.dto';
import { GetBookDto } from 'src/controller/dto/book/get-book.dto';
import { arrayBuffer } from 'stream/consumers';
import { EBook } from 'src/common/utils/enums/book.enum';

@Injectable()
export class ServiceBook implements IServiceBook {
    constructor(
        public readonly _bookUc: IBookUc
    ) {
    }
    private MapResponse(data, Response) {
        if (data instanceof Error) {
            Response
                .status(HttpStatus.BAD_REQUEST).send({
                    statusCode: HttpStatus.BAD_REQUEST,
                    error: data.message
                })

        } else if (!data || !data.length) {
            Response
                .status(HttpStatus.NOT_FOUND).send({
                    statusCode: HttpStatus.BAD_REQUEST,
                    error: data.message
                })
        }
        else {
            Response
                .status(HttpStatus.OK)
                .send({
                    statusCode: HttpStatus.OK,
                    timestamp: new Date().toISOString(),
                    data: data
                }
                )

        }
    }
    async deleteBookById(_id: string, Response: ResponseExpress): Promise<any> {
        const DELETE_BY_ID_BOOK = await this._bookUc.deleteBookById(_id)
        this.MapResponse(DELETE_BY_ID_BOOK, Response)
    }

    async getBookById(_id: any, Response: ResponseExpress): Promise<any> {

        const GET_BY_ID_BOOK = await this._bookUc.getBookById(_id)
        this.MapResponse(GET_BY_ID_BOOK, Response)

    }
    async updateBooks(id: string, data: any, bookDto: UpdateBookDto, Response: ResponseExpress): Promise<any> {
        var newData = data
        newData.id = id
        const UPDATE_BOOK = await this._bookUc.updateBooks(newData, bookDto)
        this.MapResponse(UPDATE_BOOK, Response)

    }
    async getBooks(data: any, Response: ResponseExpress) {
        const GET_BOOK = await this._bookUc.getBooks(data)
        this.MapResponse(GET_BOOK, Response)

    }
    async createBooks(bookDto: CreateBookDto, Response: ResponseExpress): Promise<any> {


        const CREATE_BOOK = await this._bookUc.createBooks(bookDto)
        this.MapResponse(CREATE_BOOK, Response)


    }

}