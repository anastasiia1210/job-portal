import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Put } from "@nestjs/common";
import { JobOfferService } from './job-offer.service';
import { CreateJobOfferDto } from './dto/create-job-offer.dto';
import { UpdateJobOfferDto } from './dto/update-job-offer.dto';
import { JobOffer } from "./job-offer.entity";
import { Response } from "express";

@Controller('job-offer')
export class JobOfferController {
  constructor(private readonly jobOfferService: JobOfferService) {}

  @Post()
  async create(@Body() createJobOfferDto: CreateJobOfferDto): Promise<JobOffer> {
    return await this.jobOfferService.create(createJobOfferDto);
  }

  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    const offers: JobOffer[] = await this.jobOfferService.findAll();
    const totalCount = offers.length;
    res.setHeader(
      'Content-Range',
      `offers 0-${offers.length - 1}/${totalCount}`,
    );
    res.json(offers);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<JobOffer | undefined> {
    return await this.jobOfferService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateJobOfferDto: UpdateJobOfferDto): Promise<JobOffer> {
    return await this.jobOfferService.update(id, updateJobOfferDto);
  }

  @Put(':id')
  async updatePut(@Param('id') id: string, @Body() updateJobOfferDto: UpdateJobOfferDto): Promise<JobOffer> {
    return await this.jobOfferService.update(id, updateJobOfferDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<JobOffer> {
    return await this.jobOfferService.remove(id);
  }
}
