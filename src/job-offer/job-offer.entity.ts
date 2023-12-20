import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JobCategory } from '../job-category/job-category.entity';
import { Company } from '../company/company.entity';
import { JobRequest } from '../job-request/job-request.entity';

@Entity({ name: 'job-offer' })
export class JobOffer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'int' })
  salary: number;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  duties: string;

  @Column({ type: 'text' })
  requirements: string;

  @Column({ type: 'text' })
  conditions: string;

  @Column({ type: 'boolean', nullable: true })
  militaryWork: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  postingDate: Date;

  @ManyToOne(() => JobCategory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_category' })
  category: JobCategory;

  @ManyToOne(() => Company, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'id_company' })
  company: Company;

  @OneToMany(() => JobRequest, (jobRequest) => jobRequest.jobOffer, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  jobRequests: JobRequest[];
}
