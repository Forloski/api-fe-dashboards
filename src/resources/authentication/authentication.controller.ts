import { RealIP } from 'nestjs-real-ip';
import { Request as IRequest } from 'express';
import { Controller, Post, UseGuards, Request, Body, Get } from '@nestjs/common';
import { LocalAuthenticationGuard } from 'src/common/guards/local-authentication.guard';
import { PublicRoute } from 'src/common/decorators/metadata/public-route.decorator';
import { User } from 'src/resources/users/entities/user.entity';
import { AuthenticationService } from './authentication.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @PublicRoute()
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Request() req: IRequest) {
    console.log('teste');
    const user = req.user as User;
    const ipAddress = req.headers['x-real-ip'] as string;

    return this.authenticationService.login(user, ipAddress);
  }

  @PublicRoute()
  @Post('refreshTokens')
  async refreshToken(@Request() req: IRequest, @Body('refreshToken') refreshToken: string) {
    const ipAddress = req.headers['x-real-ip'] as string;

    return this.authenticationService.regenerateTokens(refreshToken, ipAddress);
  }

  @PublicRoute()
  @Get('teste')
  async teste() {
    return 'teste';
  }
}
