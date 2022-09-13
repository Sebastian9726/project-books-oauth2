import { Module } from '@nestjs/common';
import { DataProviderModule } from 'src/data-provider/data-provider.module';
import { IBookUc } from './use-case/book.uc';
import { BookUcimpl } from './use-case/impl/book.uc.impl';
import { UserUcimpl } from './use-case/impl/user.uc.impl';
import { IUserUc } from './use-case/user.uc';

@Module({
    imports: [DataProviderModule],
    providers: [ 
        { provide: IBookUc, useClass: BookUcimpl },
        { provide: IUserUc, useClass: UserUcimpl },
    ],
    exports: [IBookUc,IUserUc ]

})
export class CoreModule {}
