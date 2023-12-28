import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Seeker } from '../seeker/seeker.entity';
import { JobOffer } from '../job-offer/job-offer.entity';
import { CV } from '../cv/cv.entity';
import { NotificationJob } from '../notification/notification.entity';

@Entity({ name: 'job-request' })
export class JobRequest extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  text: string;

  @Column({ type: 'boolean', nullable: true })
  status: boolean;

  @ManyToOne(() => Seeker, (seeker) => seeker.jobRequests, {
    onDelete: 'CASCADE',
  })
  seeker: Seeker;

  @ManyToOne(() => JobOffer, (jobOffer) => jobOffer.jobRequests, {
    onDelete: 'CASCADE',
  })
  jobOffer: JobOffer;

  @ManyToOne(() => CV, (cv) => cv.jobRequests, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  cv: CV;

  @OneToMany(() => NotificationJob, (notification) => notification.jobRequest, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  notificationsJob: NotificationJob[];
}
