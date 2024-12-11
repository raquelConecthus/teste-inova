import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id?: number;

  @Column({ length: 500 })
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
