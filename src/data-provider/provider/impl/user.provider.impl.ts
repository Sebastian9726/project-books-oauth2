import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model,Types } from 'mongoose';
import { IBook } from 'src/core/entity/book/book.entity';
import { BookModel } from 'src/data-provider/model/book/book.model';
import { IUserProvider } from '../user.provider';
import { AnyARecord } from 'dns';
import { UserModel } from 'src/data-provider/model/user/user.model';


@Injectable()
export class UserProvider implements IUserProvider {

    constructor(
        @InjectModel(UserModel.name)
        private readonly userModel: Model<UserModel>,

    ) { }
    async getUser(id: string): Promise<any> {
        try {
            const filter = {_id:new Types.ObjectId(id)}
            
            const valor =await this.userModel.findOne(filter)
            return valor
        } catch (e) {
            return e
        }
    }
    async updateUser(filter: any, data: any): Promise<any> {
        try {
            return await this.userModel.findByIdAndUpdate(filter,data)
        } catch (e) {
            return e
        }
    }
    async createUser(user: any): Promise<any> {
        try {
            return await this.userModel.insertMany(user)
        } catch (e) {
            return e
        }
    }
    async deleteUser(id: string): Promise<any> {
        try {
            const filter = {_id:new Types.ObjectId(id)}
            const valor =await this.userModel.deleteOne(filter)
            return valor
        } catch (e) {
            return e
        }
    }
   



}

