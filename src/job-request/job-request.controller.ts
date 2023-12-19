import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobRequestService } from './job-request.service';
import { CreateJobRequestDto } from './dto/create-job-request.dto';
import { UpdateJobRequestDto } from './dto/update-job-request.dto';

@Controller('job-request')
export class JobRequestController {
  constructor(private readonly jobRequestService: JobRequestService) {}

  @Post()
  create(@Body() createJobRequestDto: CreateJobRequestDto) {
    return this.jobRequestService.create(createJobRequestDto);
  }

  @Get()
  findAll() {
    return this.jobRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobRequestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobRequestDto: UpdateJobRequestDto) {
    return this.jobRequestService.update(+id, updateJobRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobRequestService.remove(+id);
  }
}
