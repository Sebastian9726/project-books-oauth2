import { HttpStatus, Injectable, ArgumentsHost, Res } from '@nestjs/common';
import { CreateBookDto } from 'src/controller/dto/book/create-book.dto';
import { IServiceBook } from '../book.service';
import { Request as RequestExpress, Response as ResponseExpress } from 'express';
import { IBookUc } from 'src/core/use-case/book.uc';
import { Console } from 'console';
import { UpdateBookDto } from 'src/controller/dto/book/update-book.dto';
import { GetBookDto } from 'src/controller/dto/book/get-book.dto';
import { arrayBuffer } from 'stream/consumers';

@Injectable()
export class ServiceBook implements IServiceBook {
    constructor(
        public readonly _bookUc: IBookUc
    ) {
    }
    async updateBooks(id:string,data: any, bookDto: UpdateBookDto, Response: ResponseExpress): Promise<any> {
        var newData = data
        newData.id = id
        const UPDATE_BOOK = await this._bookUc.updateBooks(newData, bookDto)
        if (UPDATE_BOOK instanceof Error) {
            Response
                .status(HttpStatus.BAD_REQUEST).send({
                    statusCode: HttpStatus.BAD_REQUEST,
                    error: UPDATE_BOOK.message
                })

        } else if (!UPDATE_BOOK || UPDATE_BOOK.length) {

            Response
                .status(HttpStatus.NOT_FOUND).send({
                    statusCode: HttpStatus.BAD_REQUEST,
                    error: UPDATE_BOOK.message
                })
        }


        else {
            Response
                .status(HttpStatus.OK)
                .send({
                    statusCode: HttpStatus.OK,
                    timestamp: new Date().toISOString(),
                    data: UPDATE_BOOK
                }
                )

        }

    }
    async getBooks(id:string,data: any, Response: ResponseExpress) {
        try {
            data.id = id
            const GET_BOOK = await this._bookUc.getBooks(data)
            if (GET_BOOK instanceof Error) {
                Response
                    .status(HttpStatus.BAD_REQUEST).send({
                        statusCode: HttpStatus.BAD_REQUEST,
                        error: GET_BOOK.message
                    })

            } else if (!GET_BOOK || !GET_BOOK.length) {

                Response
                    .status(HttpStatus.NOT_FOUND).send({
                        statusCode: HttpStatus.BAD_REQUEST,
                        error: GET_BOOK.message
                    })
            }

            else {
                Response
                    .status(HttpStatus.OK)
                    .send({
                        statusCode: HttpStatus.OK,
                        timestamp: new Date().toISOString(),
                        data: GET_BOOK
                    }
                    )

            }

        } catch (e) {
            Response
                .status(HttpStatus.BAD_REQUEST).send({
                    statusCode: HttpStatus.BAD_REQUEST,
                    error: e.message
                })

        }


    }
    async createBooks(bookDto: CreateBookDto, Response: ResponseExpress): Promise<any> {


        const CREATE_BOOK = await this._bookUc.createBooks(bookDto)

        if (CREATE_BOOK instanceof Error) {
            Response
                .status(HttpStatus.BAD_REQUEST).send({
                    statusCode: HttpStatus.BAD_REQUEST,
                    error: CREATE_BOOK.message
                })
        } else if (!CREATE_BOOK || CREATE_BOOK.length) {

            Response
                .status(HttpStatus.NOT_FOUND).send({
                    statusCode: HttpStatus.BAD_REQUEST,
                    error: CREATE_BOOK.message
                })
        }

        else {
            Response
                .status(HttpStatus.CREATED)
                .send({
                    statusCode: HttpStatus.OK,
                    timestamp: new Date().toISOString()
                }
                )
        }

    }




}