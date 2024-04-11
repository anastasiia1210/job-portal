import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateJobOfferDto } from './dto/create-job-offer.dto';
import { UpdateJobOfferDto } from './dto/update-job-offer.dto';
import { JobOffer } from './job-offer.entity';
import { JobCategory } from '../job-category/job-category.entity';
import { Company } from '../company/company.entity';

@Injectable()
export class JobOfferService {
  async create(createJobOfferDto: CreateJobOfferDto): Promise<JobOffer> {
    try {
      const company = await Company.findOneOrFail(createJobOfferDto.companyId);
      const category = await JobCategory.findOneOrFail(
        createJobOfferDto.categoryId,
      );

      const jobOffer = JobOffer.create(createJobOfferDto);
      jobOffer.company = company;
      jobOffer.category = category;
      return await jobOffer.save();
    } catch (error) {
      throw new HttpException(
        `Company or category not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAll(): Promise<JobOffer[]> {
    const jobOffers: JobOffer[] = await JobOffer.find({
      relations: ['company', 'category'],
    });
    return jobOffers;
  }

  async findOne(id: string): Promise<JobOffer | undefined> {
    return await JobOffer.findOne(id, {
      relations: ['company', 'category', 'jobRequests'],
    });
  }

  async update(
    id: string,
    updateJobOfferDto: UpdateJobOfferDto,
  ): Promise<JobOffer> {
    const jobOffer = await JobOffer.findOne(id);
    if (!jobOffer) {
      throw new HttpException(
        'Job offer with id ${id} not found',
        HttpStatus.NOT_FOUND,
      );
    }
    try {
      Object.assign(jobOffer, updateJobOfferDto);
      if (updateJobOfferDto.companyId) {
        const company = await Company.findOneOrFail(
          updateJobOfferDto.companyId,
        );
        jobOffer.company = company;
      }
      if (updateJobOfferDto.categoryId) {
        const category = await JobCategory.findOneOrFail(
          updateJobOfferDto.categoryId,
        );
        jobOffer.category = category;
      }
      return await JobOffer.save(jobOffer);
    } catch (error) {
      throw new HttpException(
        'Company or category not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: string): Promise<JobOffer> {
    try {
      const jobOffer: JobOffer | undefined = await JobOffer.findOne(id);
      await jobOffer.remove();
      return jobOffer;
    } catch (error) {
      throw new HttpException('Job offer not found', HttpStatus.NOT_FOUND);
    }
  }
}
