import { Injectable } from '@nestjs/common';
import qb from 'dbschema/edgeql-js';
import { DBService } from 'src/providers/database/database.service';
import { RefreshToken } from './entities/refresh-token.entity';

@Injectable()
export class RefreshTokensRepository {
  constructor(private readonly db: DBService) {}

  async create(
    userId: string,
    userAgent: string,
    ipAddress: string,
  ): Promise<Partial<RefreshToken>> {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const insertToken = qb.insert(qb.RefreshToken, {
      expiresAt,
      ipAddress,
      userAgent,
      user: qb.select(qb.User, (u) => ({ filter: qb.op(u.id, '=', qb.uuid(userId)) })),
    });

    const selectToken = qb.select(insertToken, () => ({ ...qb.RefreshToken['*'] }));

    return selectToken.run(this.db.client);
  }

  async findOne(refreshTokenId: string): Promise<RefreshToken> {
    const findOneToken = qb.select(qb.RefreshToken, (rt) => ({
      ...qb.RefreshToken['*'],
      user: {
        id: true,
        username: true,
      },
      filter: qb.op(rt.id, '=', qb.uuid(refreshTokenId)),
    }));

    return findOneToken.run(this.db.client);
  }

  async findOneByUsername(username: string): Promise<RefreshToken> {
    const findOneTokenByUsername = qb.select(qb.RefreshToken, (rt) => ({
      ...qb.RefreshToken['*'],
      user: {
        id: true,
        username: true,
      },
      filter: qb.op(rt.user.username, '=', username),
    }));

    const [refreshToken] = await findOneTokenByUsername.run(this.db.client);

    return refreshToken;
  }

  async remove(refreshTokenId: string): Promise<void> {
    const removeToken = qb.delete(qb.RefreshToken, (rt) => ({
      filter: qb.op(rt.id, '=', qb.uuid(refreshTokenId)),
    }));

    await removeToken.run(this.db.client);
  }
}
