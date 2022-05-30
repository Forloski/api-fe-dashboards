import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LocalAuthenticationGuard } from '../../common/guards/local-authentication.guard';
import { PublicRoute } from 'src/common/decorators/metadata/public-route.decorator';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @PublicRoute()
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authenticationService.login(req.user);
  }
}
