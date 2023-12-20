import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employer } from '../employer/employer.entity';
import { JobOffer } from '../job-offer/job-offer.entity';

@Entity({ name: 'company' })
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  telegram: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  image: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => Employer, (employer) => employer.company, {
    onDelete: 'CASCADE',
  })
  employers: Employer[];

  @OneToMany(() => JobOffer, (jobOffer) => jobOffer.company, {
    onDelete: 'CASCADE',
  })
  jobOffers: JobOffer[];
}
