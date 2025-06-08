import { PrimaryGeneratedColumn } from 'typeorm';

// AbstractEntity is a base class for all entities in the application.
// It provides a primary key field 'id' that is automatically generated.
export class AbstractEntity<T> {
  @PrimaryGeneratedColumn()
  id: number;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
