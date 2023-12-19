import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'seeker' })
export class Seeker extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'varchar', length: 20 })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  telegram: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  image: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'date' })
  birthday: Date;

  @Column({ type: 'varchar', length: 10 })
  gender: string;

  @Column({ type: 'boolean', nullable: true })
  militaryExperience: boolean;

  @Column({ type: 'boolean', nullable: true })
  militaryWork: boolean;
}
