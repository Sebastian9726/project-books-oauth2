import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import generalConfig from 'src/common/configuration/general.config';
import { CoreModule } from 'src/core/core.module';
import { BookController } from './rest/book.controller';
import { loginController } from './rest/login.controller';
import { IServiceBook } from './service/book.service';
import { AuthorizationService } from './service/impl/authorization.service';
import { ServiceBook } from './service/impl/book.service.impl';
import { JwtStrategy } from './strategies/jwt .strategy';
import { LocalStrategy } from './strategies/local.straregy';
import { UsersService } from './user.service';



@Module({
  imports: [
    CoreModule,
    PassportModule,
    JwtModule.register({
      secret: generalConfig.secret,
      signOptions: { expiresIn: '60s' },
    }),],
  controllers: [ BookController, loginController],
  providers: [
    UsersService,
    LocalStrategy,
    AuthorizationService,
    JwtStrategy,
    { provide: IServiceBook, useClass: ServiceBook, },
  ],
  exports: [IServiceBook,UsersService]

})
export class ControllerModule { }
