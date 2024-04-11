import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Put } from "@nestjs/common";
import { JobCategoryService } from './job-category.service';
import { CreateJobCategoryDto } from './dto/create-job-category.dto';
import { UpdateJobCategoryDto } from './dto/update-job-category.dto';
import { JobCategory } from "./job-category.entity";
import { Response } from "express";

@Controller('job-category')
export class JobCategoryController {
  constructor(private readonly jobCategoryService: JobCategoryService) {}

  @Post()
  async create(@Body() createJobCategoryDto: CreateJobCategoryDto): Promise<JobCategory> {
    return await this.jobCategoryService.create(createJobCategoryDto);
  }

  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    const categories: JobCategory[] = await this.jobCategoryService.findAll();
    const totalCount = categories.length;
    res.setHeader(
      'Content-Range',
      `job-category 0-${categories.length - 1}/${totalCount}`,
    );
    res.json(categories);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<JobCategory | undefined> {
    return await this.jobCategoryService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateJobCategoryDto: UpdateJobCategoryDto): Promise<JobCategory> {
    return await this.jobCategoryService.update(id, updateJobCategoryDto);
  }

  @Put(':id')
  async updatePut(@Param('id') id: string, @Body() updateJobCategoryDto: UpdateJobCategoryDto): Promise<JobCategory> {
    return await this.jobCategoryService.update(id, updateJobCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<JobCategory> {
    return await this.jobCategoryService.remove(id);
  }
}
