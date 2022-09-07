import { Module } from '@nestjs/common';
import { DataProviderModule } from 'src/data-provider/data-provider.module';
import { IBookUc } from './use-case/book.uc';
import { BookUcimpl } from './use-case/impl/book.uc.impl';

@Module({
    imports: [DataProviderModule],
    providers: [ 
        { provide: IBookUc, useClass: BookUcimpl },
    ],
    exports: [IBookUc ]

})
export class CoreModule {}
