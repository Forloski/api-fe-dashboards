import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from 'src/providers/crypto/crypto.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { RefreshTokensRepository } from './refresh-tokens.repository';
import { RefreshTokenPayload } from './types/refresh-token-payload.type';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly refreshTokensRepository: RefreshTokensRepository,
    private readonly usersService: UsersService,
    private readonly cryptoService: CryptoService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<Partial<User>> {
    const user = await this.usersService.findOneByUsername(username);
    if (await this.cryptoService.validateHash(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...partialUser } = user;
      return partialUser;
    }
    return null;
  }

  async login(user: User, userAgent: string, ipAddress: string) {
    const userToken = await this.refreshTokensRepository.findOneByUsername(user.username);
    userToken && (await this.refreshTokensRepository.remove(userToken.id));
    const accessToken = await this.createAccessToken(user);
    const refreshToken = await this.createRefreshToken(user, userAgent, ipAddress);
    return { accessToken, refreshToken };
  }

  async findByUsername(username: string) {
    const refreshToken = await this.refreshTokensRepository.findOneByUsername(username);
    if (!refreshToken) {
      throw new HttpException({ message: 'Invalid refresh token.' }, HttpStatus.UNAUTHORIZED);
    }
    return refreshToken;
  }

  async regenerateTokens(token: string, userAgent: string, ipAddress: string) {
    const refreshToken = await this.validateRefreshToken(token, userAgent, ipAddress);
    const user = await this.usersService.findOne(refreshToken.user.id);
    await this.refreshTokensRepository.remove(refreshToken.id);
    const accessToken = await this.createAccessToken(user);
    const newRefreshToken = await this.createRefreshToken(user, userAgent, ipAddress);
    return { accessToken, refreshToken: newRefreshToken };
  }

  private async createAccessToken(user: User) {
    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload, { expiresIn: '30m', secret: 'secret' });
    return token;
  }

  private async createRefreshToken(user: User, userAgent: string, ipAddress: string) {
    const tokenId = await this.refreshTokensRepository.create(user.id, userAgent, ipAddress);
    const payload = {
      username: user.username,
      sub: user.id,
      jwtid: tokenId.id,
      userAgent,
      ipAddress,
    };
    const token = this.jwtService.sign(payload, { expiresIn: '7d', secret: 'verySecret' });
    return token;
  }

  private async validateRefreshToken(token: string, userAgent: string, ipAddress: string) {
    const tokenPayload = this.jwtService.verify<RefreshTokenPayload>(token, {
      secret: 'verySecret',
    });
    const refreshToken = await this.refreshTokensRepository.findOne(tokenPayload.jwtid);
    if (
      !refreshToken ||
      refreshToken.userAgent !== userAgent ||
      refreshToken.ipAddress !== ipAddress
    ) {
      throw new HttpException({ message: 'Invalid refresh token' }, HttpStatus.UNAUTHORIZED);
    }
    return refreshToken;
  }

  // private async removeRefreshToken(refreshTokenId: string): Promise<void> {
  //   return this.refreshTokensRepository.remove(refreshTokenId);
  // }
}
