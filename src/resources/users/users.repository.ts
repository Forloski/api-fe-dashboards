import { DBService } from 'src/providers/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import qb from 'dbschema/edgeql-js';

@Injectable()
export class UsersRepository {
  constructor(private readonly db: DBService) {}

  private userAttrsWithoutPassword = { ...qb.User['*'], password: false };

  async create(createUserDto: CreateUserDto): Promise<User> {
    const insertUser = qb.insert(qb.User, { ...createUserDto });
    const selectUser = qb.select(insertUser, () => ({
      ...this.userAttrsWithoutPassword,
    }));

    return selectUser.run(this.db.client);
  }

  async findAll(): Promise<Partial<User>[]> {
    const findAllUsers = qb.select(qb.User, () => ({
      ...this.userAttrsWithoutPassword,
    }));

    return findAllUsers.run(this.db.client);
  }

  async findOne(userId: string): Promise<User> {
    const findOneUser = qb.select(qb.User, (u) => ({
      ...this.userAttrsWithoutPassword,
      filter: qb.op(u.id, '=', qb.uuid(userId)),
    }));
    return findOneUser.run(this.db.client);
  }

  async findOneByUsername(username: string): Promise<Partial<User>> {
    const findOneUserByUsername = qb.select(qb.User, (u) => ({
      ...qb.User['*'],
      filter: qb.op(u.username, '=', username),
    }));

    const user = await findOneUserByUsername.run(this.db.client);

    return user;
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<Partial<User>> {
    const updateUser = qb.update(qb.User, (u) => ({
      filter: qb.op(u.id, '=', qb.uuid(userId)),
      set: {
        ...updateUserDto,
      },
    }));
    const selectUser = qb.select(updateUser, () => ({
      ...this.userAttrsWithoutPassword,
    }));

    return selectUser.run(this.db.client);
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
