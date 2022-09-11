import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../guards/jw-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthorizationService } from '../service/impl/authorization.service';

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
}