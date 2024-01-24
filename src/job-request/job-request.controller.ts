import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from "@nestjs/common";
import { JobRequestService } from './job-request.service';
import { CreateJobRequestDto } from './dto/create-job-request.dto';
import { UpdateJobRequestDto } from './dto/update-job-request.dto';
import { JobRequest } from "./job-request.entity";
import { Company } from "../company/company.entity";
import { JobCategory } from "../job-category/job-category.entity";
import { JobOffer } from "../job-offer/job-offer.entity";
import { CV } from "../cv/cv.entity";

@Controller('job-request')
export class JobRequestController {
  constructor(private readonly jobRequestService: JobRequestService) {}

  @Post()
  async create(@Body() createJobRequestDto: CreateJobRequestDto): Promise<JobRequest> {
    return await this.jobRequestService.create(createJobRequestDto);
  }

  @Get()
  async findAll(): Promise<JobRequest[]> {
    return await this.jobRequestService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<JobRequest | undefined> {
    return await this.jobRequestService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateJobRequestDto: UpdateJobRequestDto): Promise<JobRequest> {
    return await this.jobRequestService.update(id, updateJobRequestDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<JobRequest> {
    return await this.jobRequestService.remove(id);
  }

  @Get('seeker/:id')
  async findAllofOneSeeker(@Param('id') id: string): Promise<JobRequest[]> {
    return await this.jobRequestService.findAllofOneSeeker(id);
  }
}
