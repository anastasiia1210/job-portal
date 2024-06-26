import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeekerModule } from './seeker/seeker.module';
import { AdminModule } from './admin/admin.module';
import { CompanyModule } from './company/company.module';
import { EmployerModule } from './employer/employer.module';
import { JobOfferModule } from './job-offer/job-offer.module';
import { JobCategoryModule } from './job-category/job-category.module';
import { JobRequestModule } from './job-request/job-request.module';
import { NotificationModule } from './notification/notification.module';
import { CVModule } from './cv/cv.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot(),
    SeekerModule,
    AdminModule,
    CompanyModule,
    EmployerModule,
    CVModule,
    JobOfferModule,
    JobCategoryModule,
    JobRequestModule,
    NotificationModule,
  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
