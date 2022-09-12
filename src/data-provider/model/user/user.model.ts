import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mixed, now } from 'mongoose';

@Schema({ versionKey: false})
export class UserModel extends Document {

    @Prop({ type: String}) 
    name: string;

    @Prop({ type: String}) 
    genre: string;
    

    @Prop({ type: String}) 
    username:string

    @Prop({ type: String}) 
    password:string


    @Prop({ type: Object}) 
    tokenOauth2:string

}

export const UserSchema = SchemaFactory.createForClass(UserModel);
UserSchema.index({ username: 1, password: 1 }, { unique: true });