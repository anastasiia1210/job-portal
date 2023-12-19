import { Module } from '@nestjs/common';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeekerModule } from './seeker/seeker.module';
import { AdminModule } from './admin/admin.module';
import { CompanyModule } from './company/company.module';
import { EmployerModule } from './employer/employer.module';
import { CvModule } from './cv/cv.module';
import { JobOfferModule } from './job-offer/job-offer.module';
import { JobCategoryModule } from './job-category/job-category.module';
import { JobRequestModule } from './job-request/job-request.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    CloudinaryModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(),
    SeekerModule,
    AdminModule,
    CompanyModule,
    EmployerModule,
    CvModule,
    JobOfferModule,
    JobCategoryModule,
    JobRequestModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
