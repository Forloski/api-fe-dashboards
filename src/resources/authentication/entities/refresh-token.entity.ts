import { User } from 'src/resources/users/entities/user.entity';

export class RefreshToken {
  id: string;
  expiresAt: Date;
  userAgent: string;
  ipAddress: string;
  user?: Partial<User>;
}
