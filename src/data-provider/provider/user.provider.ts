import { Injectable } from '@nestjs/common';
import { IUser } from 'src/core/entity/user/user.entity';


@Injectable()
export abstract class IUserProvider {

    abstract updateUser(filter: any, data: any): Promise<any>;

    abstract createUser(user: IUser): Promise<any>;

    abstract getUser(id: string): Promise<any>;

    abstract deleteUser(id: string): Promise<any>;

}