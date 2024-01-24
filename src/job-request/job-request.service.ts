import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateJobRequestDto } from './dto/create-job-request.dto';
import { UpdateJobRequestDto } from './dto/update-job-request.dto';
import { JobRequest } from './job-request.entity';
import { JobOffer } from '../job-offer/job-offer.entity';
import { Seeker } from '../seeker/seeker.entity';
import { CV } from '../cv/cv.entity';

@Injectable()
export class JobRequestService {
  async create(createJobRequestDto: CreateJobRequestDto): Promise<JobRequest> {
    try {
      const seeker = await Seeker.findOneOrFail(createJobRequestDto.seekerId);
      const cv = await CV.findOneOrFail(createJobRequestDto.cvId);
      const jobOffer = await JobOffer.findOneOrFail(
        createJobRequestDto.jobOfferId,
      );

      const jobRequest = JobRequest.create(createJobRequestDto);
      jobRequest.seeker = seeker;
      jobRequest.cv = cv;
      jobRequest.jobOffer = jobOffer;
      return await jobRequest.save();
    } catch (error) {
      throw new HttpException(
        `Seeker, cv or job offer not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAll(): Promise<JobRequest[]> {
    const jobRequests: JobRequest[] = await JobRequest.find({
      relations: ['seeker', 'cv', 'jobOffer'],
    });
    return jobRequests;
  }

  async findOne(id: string): Promise<JobRequest | undefined> {
    try {
      return await JobRequest.findOne(id, {
        relations: ['seeker', 'cv', 'jobOffer'],
      });
    } catch (error) {
      throw new HttpException('Job request not found', HttpStatus.NOT_FOUND);
    }
  }

  async update(
    id: string,
    updateJobRequestDto: UpdateJobRequestDto,
  ): Promise<JobRequest> {
    const jobRequest = await JobRequest.findOne(id);
    if (!jobRequest) {
      throw new HttpException(
        'Job request with id ${id} not found',
        HttpStatus.NOT_FOUND,
      );
    }
    try {
      Object.assign(jobRequest, updateJobRequestDto);
      if (updateJobRequestDto.seekerId) {
        const seeker = await Seeker.findOneOrFail(updateJobRequestDto.seekerId);
        jobRequest.seeker = seeker;
      }
      if (updateJobRequestDto.cvId) {
        const cv = await CV.findOneOrFail(updateJobRequestDto.cvId);
        jobRequest.cv = cv;
      }
      if (updateJobRequestDto.jobOfferId) {
        const jobOffer = await JobOffer.findOneOrFail(
          updateJobRequestDto.jobOfferId,
        );
        jobRequest.jobOffer = jobOffer;
      }
      return await JobRequest.save(jobRequest);
    } catch (error) {
      throw new HttpException(
        'Seeker, cv or job offer not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: string): Promise<JobRequest> {
    try {
      const jobRequest: JobRequest | undefined = await JobRequest.findOne(id);
      await jobRequest.remove();
      return jobRequest;
    } catch (error) {
      throw new HttpException('Job request not found', HttpStatus.NOT_FOUND);
    }
  }

  async findAllofOneSeeker(id: string): Promise<JobRequest[]> {
    const jobRequests: JobRequest[] = await JobRequest.find({
      where: {
        seeker: { id: id },
      },
      relations: ['cv', 'seeker', 'jobOffer'],
    });

    return jobRequests;
  }
}
