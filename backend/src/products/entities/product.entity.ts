import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500 })
  name: string;

  @Column()
  code: string;

  @Column()
  creator: string;

  @Column()
  approver: string;

  @Column('datetime')
  startDate: string;

  @Column('datetime')
  endDate: string;

  @Column()
  productFamily: string;

  @Column()
  finalGood: string;
}
