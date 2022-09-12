import { Injectable } from '@nestjs/common';

import {Request as RequestExpress,Response as ResponseExpress} from 'express';
import { CreateUserDto } from '../dto/user/create-user.dto';

@Injectable()
export abstract class IServiceAuthorization {

  abstract login( data:any, response:ResponseExpress): Promise<any>;// TIPAR DEL TIPO

  abstract validateUser(username: string, pass: string ): Promise<any>;

  abstract register(CreateUserDto: CreateUserDto, response:ResponseExpress): Promise<any>;

  abstract token(request:any, response:any): Promise<any>;
 }