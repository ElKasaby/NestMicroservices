import { AbstractRepository, User } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UsersRepository extends AbstractRepository<User> {
  protected readonly logger = new Logger(UsersRepository.name);

  constructor(
    @InjectRepository(User) // Inject the TypeORM repository for User entity
    usersRepository: Repository<User>,
    entityManager: EntityManager, // Inject the EntityManager for transactions
  ) {
    super(usersRepository, entityManager);
  }
}
