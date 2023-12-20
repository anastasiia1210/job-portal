import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JobRequest } from '../job-request/job-request.entity';
import { Seeker } from '../seeker/seeker.entity';

@Entity({ name: 'notification' })
export class NotificationJob extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  text: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ type: 'boolean', nullable: true })
  isRead: boolean;

  @ManyToOne(() => JobRequest, (jobRequest) => jobRequest.notificationsJob, {
    onDelete: 'CASCADE',
  })
  jobRequest: JobRequest;

  @ManyToOne(() => Seeker, (seeker) => seeker.notificationsJob, {
    onDelete: 'CASCADE',
  })
  seeker: Seeker;
}
