import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobOfferService } from './job-offer.service';
import { CreateJobOfferDto } from './dto/create-job-offer.dto';
import { UpdateJobOfferDto } from './dto/update-job-offer.dto';
import { JobOffer } from "./job-offer.entity";

@Controller('job-offer')
export class JobOfferController {
  constructor(private readonly jobOfferService: JobOfferService) {}

  @Post()
  async create(@Body() createJobOfferDto: CreateJobOfferDto): Promise<JobOffer> {
    return await this.jobOfferService.create(createJobOfferDto);
  }

  @Get()
  async findAll(): Promise<JobOffer[]> {
    return await this.jobOfferService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<JobOffer | undefined> {
    return await this.jobOfferService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateJobOfferDto: UpdateJobOfferDto): Promise<JobOffer> {
    return await this.jobOfferService.update(id, updateJobOfferDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<JobOffer> {
    return await this.jobOfferService.remove(id);
  }
}
