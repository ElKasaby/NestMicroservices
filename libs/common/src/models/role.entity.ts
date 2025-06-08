import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../database';

@Entity()
export class Role extends AbstractEntity<Role> {
  // The 'name' field is the unique identifier for the role.
  // It is used to assign roles to users and to check permissions.
  @Column()
  name: string;
}
