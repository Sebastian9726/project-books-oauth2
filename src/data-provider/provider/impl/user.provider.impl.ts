import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IBook } from 'src/core/entity/book/book.entity';
import { BookModel } from 'src/data-provider/model/book/book.model';
import { IUserProvider } from '../user.provider';
import { AnyARecord } from 'dns';
import { UserModel } from 'src/data-provider/model/user/user.model';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserProvider implements IUserProvider {

    constructor(
        @InjectModel(UserModel.name)
        private readonly userModel: Model<UserModel>,

    ) { }
    async validateTokenOauth2(filter: any): Promise<any> {
        try {
            const validate = await this.userModel.findOne(filter)
            return validate
        } catch (e) {
            return e
        }
    }
    async getUser(username: string): Promise<any> {
        try {
            const filter = {
                "username": username
            }

            const valor = await this.userModel.findOne(filter)
            return valor
        } catch (e) {
            return e
        }
    }
    async updateUser(filter: any, data: any): Promise<any> {
        try {
            return await this.userModel.findByIdAndUpdate(filter, data)
        } catch (e) {
            return e
        }
    }
    async createUser(user: any): Promise<any> {
        try {
            const saltOrRounds = 10;
            // const password = 'random_password' HASH($2b$10$GDE3ICxejtYn7HfCXjYX8uiZ4bRDCkoGzmHG9qY..cEGeK6rjUVau);
            const hash = await bcrypt.hash(user.password, saltOrRounds);
            user.password = hash
            return await this.userModel.insertMany(user)
        } catch (e) {
            return e
        }
    }
    async deleteUser(id: string): Promise<any> {
        try {
            const filter = { _id: new Types.ObjectId(id) }
            const valor = await this.userModel.deleteOne(filter)
            return valor
        } catch (e) {
            return e
        }
    }




}

