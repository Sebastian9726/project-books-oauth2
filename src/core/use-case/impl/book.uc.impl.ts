import { HttpException, HttpStatus, Injectable, MethodNotAllowedException } from '@nestjs/common';
import { IBook } from 'src/core/entity/book/book.entity';
import { IBookUc } from '../book.uc';



@Injectable()
export class BookUcimpl implements IBookUc {
    constructor(
        //public readonly _serviceTracingProvider: IServiceTracingProvider,
    ) { }
    createBooks(book: IBook) {
        throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'This is a custom message',
          }, HttpStatus.FORBIDDEN);
    }
    /*
    async getTracibility(book) {
        return await this._serviceTracingProvider.getTracibility(
            {
                $and:
                    [

                        { createdAt: { "$gt": date} }
                    ]
            }
        )
    }
    */


}
