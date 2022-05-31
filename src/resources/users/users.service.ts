import { Injectable } from '@nestjs/common';
import { CryptoService } from 'src/providers/crypto/crypto.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly cryptoService: CryptoService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await this.cryptoService.hash(createUserDto.password);

    return this.usersRepository.create(createUserDto);
  }

  async findAll(): Promise<Partial<User>[]> {
    return this.usersRepository.findAll();
  }

  async findOne(userId: string): Promise<User> {
    return this.usersRepository.findOne(userId);
  }

  async findOneByUsername(username: string): Promise<Partial<User>> {
    const teste = await this.usersRepository.findOneByUsername(username);
    return teste;
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<Partial<User>> {
    updateUserDto.password =
      updateUserDto.password ?? (await this.cryptoService.hash(updateUserDto.password));

    return this.usersRepository.update(userId, updateUserDto);
  }

  async remove(userId: string): Promise<void> {
    return this.usersRepository.remove(userId);
  }
}
