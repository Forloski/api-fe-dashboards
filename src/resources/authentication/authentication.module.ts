import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CryptoModule } from 'src/providers/crypto/crypto.module';
import { UsersModule } from '../users/users.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtAuthGuard } from '../../common/guards/jwt-authentication.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshTokensRepository } from './refresh-tokens.repository';

@Module({
  imports: [UsersModule, CryptoModule, PassportModule, JwtModule],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    RefreshTokensRepository,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
