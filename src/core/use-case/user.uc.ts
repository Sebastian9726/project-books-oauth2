import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/controller/dto/user/create-user.dto';
import { UpdatetUserDto } from 'src/controller/dto/user/update-user.td';
import { IBook } from '../entity/book/book.entity';

@Injectable()
export abstract class IUserUc{

    abstract updateUser(filter: any, user:UpdatetUserDto): Promise<any>;

    abstract createUser(user: any): Promise<any>;

    abstract getUser(filter: any): Promise<any>;

}