import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Res, Put } from "@nestjs/common";
import { JobRequestService } from './job-request.service';
import { CreateJobRequestDto } from './dto/create-job-request.dto';
import { UpdateJobRequestDto } from './dto/update-job-request.dto';
import { JobRequest } from "./job-request.entity";
import { Response } from "express";

@Controller('job-request')
export class JobRequestController {
  constructor(private readonly jobRequestService: JobRequestService) {}

  @Post()
  async create(@Body() createJobRequestDto: CreateJobRequestDto): Promise<JobRequest> {
    return await this.jobRequestService.create(createJobRequestDto);
  }

  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    const requests: JobRequest[] = await this.jobRequestService.findAll();
    const totalCount = requests.length;
    res.setHeader(
      'Content-Range',
      `job-request 0-${requests.length - 1}/${totalCount}`,
    );
    res.json(requests);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<JobRequest | undefined> {
    return await this.jobRequestService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateJobRequestDto: UpdateJobRequestDto): Promise<JobRequest> {
    return await this.jobRequestService.update(id, updateJobRequestDto);
  }

  @Put(':id')
  async updatePut(@Param('id') id: string, @Body() updateJobRequestDto: UpdateJobRequestDto): Promise<JobRequest> {
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

  @Get('job-offer/:id')
  async findAllofOneJobOffer(@Param('id') id: string): Promise<JobRequest[]> {
    return await this.jobRequestService.findAllofOneJobOffer(id);
  }
}
