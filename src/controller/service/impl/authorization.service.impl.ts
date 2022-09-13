import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../user.service';
import { CreateUserDto } from '../../dto/user/create-user.dto'
import { Request as RequestExpress, Response as ResponseExpress } from 'express';
import { IServiceAuthorization } from '../authorization.service';

import * as OAuth2Server from 'oauth2-server';
import { IUserUc } from 'src/core/use-case/user.uc';
import oauth2Model from 'src/controller/model-oauth/oauth2.model';


const oauth = new OAuth2Server({
  model: oauth2Model,
});
@Injectable()
export class AuthorizationService implements IServiceAuthorization {


  constructor(
    public readonly _userUc: IUserUc,
    private usersService: UsersService,
    private jwtService: JwtService) { }



  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(CreateUserDto: CreateUserDto, Response: ResponseExpress) {
    const ADD_USER = await this._userUc.createUser(CreateUserDto)
    Response
      .status(HttpStatus.OK)
      .send({
        statusCode: HttpStatus.OK,
        timestamp: new Date().toISOString(),
        data: ADD_USER
      }
      )

  }

  async token(request, response) {
    try {
      return await oauth.token(
        new OAuth2Server.Request(request),
        new OAuth2Server.Response(response),
      );
    }
    catch (e) {
      console.log(e)
    }

  }
}