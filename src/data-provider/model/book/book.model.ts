import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mixed, now } from 'mongoose';

@Schema({ versionKey: false})
export class BookModel extends Document {

    @Prop({ type: String}) 
    title: string;

    @Prop({ type: String}) 
    genre: string;
    
    @Prop({ type: String}) 
    description: string;
    
    @Prop({ type: String }) 
    author: string;

    @Prop({ type: [String]}) 
    publisher:string[]

    @Prop({ type: String}) 
    pages:string

    @Prop({ type: String}) 
    image_url:string


}

export const BookSchema = SchemaFactory.createForClass(BookModel);
BookSchema.index({ title: 1, author: 1 }, { unique: true });