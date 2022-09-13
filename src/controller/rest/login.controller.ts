import { Controller, Request, Post, UseGuards, Get, Body, Res, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../guards/jw-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthorizationService } from '../service/impl/authorization.service.impl';
import { Request as RequestExpress, Response as ResponseExpress } from 'express';
import { CreateUserDto } from '../dto/user/create-user.dto';
@Controller()
export class loginController {
  constructor(
    private authService: AuthorizationService,
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

   @Post('register')
  addUser(@Body() user: CreateUserDto, @Res() res: ResponseExpress) {
    return this.authService.register(user, res)
  }

  @Post('token')
  async token(@Req() request, @Res() response) {
      const token = await this.authService.token(request, response);
      response.status(200).json(token);
  }

}