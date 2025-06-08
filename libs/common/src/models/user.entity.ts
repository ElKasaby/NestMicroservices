import { AbstractEntity } from '@app/common';
import {
  Column,
  Entity,
  ManyToMany,
  BeforeInsert,
  BeforeUpdate,
  JoinTable,
} from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User extends AbstractEntity<User> {
  @Column({
    unique: true,
    nullable: false, // Makes column NOT NULL in database
  })
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Role, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  roles?: Role[];

  @BeforeInsert()
  @BeforeUpdate()
  normalizeEmail() {
    if (this.email) {
      this.email = this.email.toLowerCase().trim();
    }
  }
}
