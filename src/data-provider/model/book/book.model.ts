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

    @Prop({ type: Boolean, default:true}) 
    active_at:boolean

    @Prop({ type: Date, default:null}) 
    create_date:Date

    @Prop({ type: Boolean,default:false}) 
    delete_at:boolean

    @Prop({ type: Date, default:new Date()}) 
    delete_date:Date

}

export const BookSchema = SchemaFactory.createForClass(BookModel);
BookSchema.index({ title: 1, author: 1 }, { unique: true });