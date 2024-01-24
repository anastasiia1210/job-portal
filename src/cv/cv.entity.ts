import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { JobCategory } from "../job-category/job-category.entity";
import { Seeker } from "../seeker/seeker.entity";
import { JobRequest } from "../job-request/job-request.entity";

@Entity({ name: 'cv' })
export class CV extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  education: string;

  @Column({ type: 'text', nullable: true })
  experience: string;

  @Column({ type: 'text', nullable: true })
  skills: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  postingDate: Date;

  @Column({ type: 'varchar', length: 200, nullable: true })
  cvLink: string;

  @ManyToOne(() => JobCategory, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_category' })
  category: JobCategory;

  @ManyToOne(() => Seeker, (seeker) => seeker.cvs, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_seeker' })
  seeker: Seeker;

  @OneToMany(() => JobRequest, (jobRequest) => jobRequest.cv, {
    onDelete: 'SET NULL',
  })
  jobRequests: JobRequest[];

  @BeforeInsert()
  updateTimestamp() {
    this.postingDate = new Date();
  }
}
