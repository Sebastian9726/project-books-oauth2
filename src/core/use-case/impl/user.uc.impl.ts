import { HttpException, HttpStatus, Injectable, MethodNotAllowedException } from '@nestjs/common';
import { CreateUserDto } from 'src/controller/dto/user/create-user.dto';
import { UpdatetUserDto } from 'src/controller/dto/user/update-user.td';
import { IBook } from 'src/core/entity/book/book.entity';
import { IBookProvider } from 'src/data-provider/provider/book.provider';
import { IUserProvider } from 'src/data-provider/provider/user.provider';
import { IBookUc } from '../book.uc';
import { IUserUc } from '../user.uc';



@Injectable()
export class UserUcimpl implements IUserUc {
    constructor(
        public readonly _userProvider: IUserProvider,
    ) { }
    async updateUser(filter: any, user: UpdatetUserDto): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async createUser(user: any): Promise<any> {
      const  ADD_USER = await this._userProvider.createUser(user)
      if (!ADD_USER) {
        return new Error('Error en base de datos')
    }
    return ADD_USER
        
    }
    async getUser(id: string): Promise<any> {
        throw new Error('Method not implemented.');
    }

}
