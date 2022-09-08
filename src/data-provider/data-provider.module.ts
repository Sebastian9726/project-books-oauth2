import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from 'src/common/configuration/database.config';
import { BookModel, BookSchema } from './model/book/book.model';
import { IBookProvider } from './provider/book.provider';
import { BookProvider } from './provider/impl/book.provider.impl';

@Module({
  imports: [
    //Conexión a base de datos
    MongooseModule.forRoot(databaseConfig.database, {
      retryAttempts: 3,
      autoCreate: true,
    }),
    MongooseModule.forFeature([
      {
        name: BookModel.name,
        schema: BookSchema,
        collection: 'book',
      },
    ]),

  ],
  providers: [
    { provide: IBookProvider, useClass: BookProvider },
  ],
  exports: [IBookProvider]
})
export class DataProviderModule { }
