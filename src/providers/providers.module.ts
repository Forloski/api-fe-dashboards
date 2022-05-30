import { Module } from '@nestjs/common';
import { CryptoModule } from './crypto/crypto.module';
import { DBModule } from './database/database.module';

@Module({
  imports: [DBModule, CryptoModule],
})
export class ProvidersModule {}
