import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { BookController } from './rest/book.controller';
import { IServiceBook } from './service/book.service';
import { ServiceBook } from './service/impl/book.service.impl';




@Module({
  imports: [CoreModule],
  controllers: [ BookController, ],
  providers: [
    { provide: IServiceBook, useClass: ServiceBook },
  ],
  exports: [IServiceBook]

})
export class ControllerModule { }
