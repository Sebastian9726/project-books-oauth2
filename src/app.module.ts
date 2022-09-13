import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { CommonModule } from './common/common.module';
import { ControllerModule } from './controller/controller.module';
import { CoreModule } from './core/core.module';
import { DataProviderModule } from './data-provider/data-provider.module';


@Module({
  imports: [CommonModule, 
    ControllerModule, 
    CoreModule, 
    DataProviderModule,
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    })],
  controllers: [],
  providers: [

  ],
})
export class AppModule {}
