import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {
  async hash(value: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedValue = await bcrypt.hash(value, salt);

    return hashedValue;
  }

  async validateHash(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
