import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobCategoryService } from './job-category.service';
import { CreateJobCategoryDto } from './dto/create-job-category.dto';
import { UpdateJobCategoryDto } from './dto/update-job-category.dto';
import { JobCategory } from "./job-category.entity";

@Controller('job-category')
export class JobCategoryController {
  constructor(private readonly jobCategoryService: JobCategoryService) {}

  @Post()
  async create(@Body() createJobCategoryDto: CreateJobCategoryDto): Promise<JobCategory> {
    return await this.jobCategoryService.create(createJobCategoryDto);
  }

  @Get()
  async findAll(): Promise<JobCategory[]>{
    return await this.jobCategoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<JobCategory | undefined> {
    return await this.jobCategoryService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateJobCategoryDto: UpdateJobCategoryDto): Promise<JobCategory> {
    return await this.jobCategoryService.update(id, updateJobCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<JobCategory> {
    return await this.jobCategoryService.remove(id);
  }
}
