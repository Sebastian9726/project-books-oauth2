import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from 'src/common/configuration/database.config';
import { BookModel, BookSchema } from './model/book/book.model';
import { UserModel, UserSchema } from './model/user/user.model';
import { IBookProvider } from './provider/book.provider';
import { BookProvider } from './provider/impl/book.provider.impl';
import { UserProvider } from './provider/impl/user.provider.impl';
import { IUserProvider } from './provider/user.provider';

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
        collection: 'books',
      },
      {
        name: UserModel.name,
        schema: UserSchema,
        collection: 'users',
      },
    ]),

  ],
  providers: [
    { provide: IBookProvider, useClass: BookProvider },
    { provide: IUserProvider, useClass: UserProvider },
  ],
  exports: [IBookProvider,IUserProvider]
})
export class DataProviderModule { }
