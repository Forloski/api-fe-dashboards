import { Injectable, OnModuleInit } from '@nestjs/common';
import { $infer } from 'dbschema/edgeql-js/syntax/syntax';
import { createClient } from 'edgedb';
import { Expression } from 'edgedb/dist/reflection';

@Injectable()
export class DBService implements OnModuleInit {
  client = createClient();

  async onModuleInit() {
    await this.client.ensureConnected();
  }

  public async query<Expr extends Expression, R = $infer<Expr>>(expression: Expr): Promise<R> {
    return expression.run(this.client);
  }
}
