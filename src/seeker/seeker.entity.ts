import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CV } from '../cv/cv.entity';
import { JobRequest } from '../job-request/job-request.entity';
import { NotificationJob } from '../notification/notification.entity';

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

  @OneToMany(() => CV, (cv) => cv.seeker, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  cvs: CV[];

  @OneToMany(() => JobRequest, (jobRequest) => jobRequest.seeker, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  jobRequests: JobRequest[];

  @OneToMany(() => NotificationJob, (notification) => notification.seeker, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  notificationsJob: NotificationJob[];
}
