import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { Reservation } from './models/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ReservationsRepository extends AbstractRepository<Reservation> {
  protected readonly logger = new Logger(ReservationsRepository.name);
  constructor(
    @InjectRepository(Reservation) // Injecting the TypeORM repository for Reservation entity
    reservarionsRepository: Repository<Reservation>,
    entityManager: EntityManager, // Injecting the EntityManager for transactions and saving entities
  ) {
    super(reservarionsRepository, entityManager);
  }
}
