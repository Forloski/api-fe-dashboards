import { Controller, Post, UseGuards, Request, Body, Delete, HttpCode } from '@nestjs/common';
import { LocalAuthenticationGuard } from '../../common/guards/local-authentication.guard';
import { PublicRoute } from 'src/common/decorators/metadata/public-route.decorator';
import { Request as IRequest } from 'express';
import { User } from '../users/entities/user.entity';
import { AuthenticationService } from './authentication.service';
import { RealIP } from 'nestjs-real-ip';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @PublicRoute()
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Request() req: IRequest, @RealIP() ipAddress: string) {
    const user = req.user as User;
    const userAgent = req.headers['user-agent'];

    return this.authenticationService.login(user, userAgent, ipAddress);
  }

  @PublicRoute()
  @Post('refreshTokens')
  async refreshToken(
    @Request() req: IRequest,
    @RealIP() ipAddress: string,
    @Body('refreshToken') refreshToken: string,
  ) {
    const userAgent = req.headers['user-agent'];

    return this.authenticationService.regenerateTokens(refreshToken, userAgent, ipAddress);
  }

  // @PublicRoute()
  // @HttpCode(204)
  // @Delete('teste')
  // async teste(@Body('username') username: string) {
  //   return this.authenticationService.removeRefreshToken(username);
  // }
}
