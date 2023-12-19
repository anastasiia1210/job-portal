import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobCategoryService } from './job-category.service';
import { CreateJobCategoryDto } from './dto/create-job-category.dto';
import { UpdateJobCategoryDto } from './dto/update-job-category.dto';

@Controller('job-category')
export class JobCategoryController {
  constructor(private readonly jobCategoryService: JobCategoryService) {}

  @Post()
  create(@Body() createJobCategoryDto: CreateJobCategoryDto) {
    return this.jobCategoryService.create(createJobCategoryDto);
  }

  @Get()
  findAll() {
    return this.jobCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobCategoryDto: UpdateJobCategoryDto) {
    return this.jobCategoryService.update(+id, updateJobCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobCategoryService.remove(+id);
  }
}
