import { DBService } from 'src/providers/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import qb from '../../../dbschema/edgeql-js';

@Injectable()
export class UsersRepository {
  constructor(private readonly db: DBService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await qb.insert(qb.User, { ...createUserDto }).run(this.db.client);
    return { ...createUserDto, ...user };
  }

  async findAll(): Promise<Partial<User>[]> {
    const users = await qb
      .select(qb.User, () => ({
        id: true,
        username: true,
      }))
      .run(this.db.client);

    return users;
  }

  async findOne(userId: string): Promise<Partial<User>> {
    const user = await qb
      .select(qb.User, (u) => ({
        id: true,
        username: true,
        filter: qb.op(u.id, '=', qb.uuid(userId)),
      }))
      .run(this.db.client);

    return user;
  }

  async findOneByUsername(username: string): Promise<Partial<User>> {
    const user = await qb
      .select(qb.User, (u) => ({
        id: true,
        password: true,
        username: true,
        filter: qb.op(u.username, '=', username),
      }))
      .run(this.db.client);

    return user;
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<Partial<User>> {
    const user = await qb
      .update(qb.User, (u) => ({
        filter: qb.op(u.id, '=', qb.uuid(userId)),
        set: {
          ...updateUserDto,
        },
      }))
      .run(this.db.client);

    return { ...updateUserDto, ...user };
  }

  async remove(userId: string): Promise<void> {
    await qb
      .delete(qb.User, (u) => ({
        filter: qb.op(u.id, '=', qb.uuid(userId)),
      }))
      .run(this.db.client);

    return;
  }
}
