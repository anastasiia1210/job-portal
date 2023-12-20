import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CV } from '../cv/cv.entity';
import { JobOffer } from '../job-offer/job-offer.entity';

@Entity({ name: 'job-category' })
export class JobCategory extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @OneToMany(() => CV, (cv) => cv.category, { onDelete: 'CASCADE' })
  cvs: CV[];

  @OneToMany(() => JobOffer, (jobOffer) => jobOffer.category, {
    onDelete: 'CASCADE',
  })
  jobOffers: JobOffer[];
}
