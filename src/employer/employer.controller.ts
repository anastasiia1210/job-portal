import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmployerService } from './employer.service';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { Employer } from './employer.entity';

@Controller('employer')
export class EmployerController {
  constructor(private readonly employerService: EmployerService) {}

  @Post()
  async create(
    @Body() createEmployerDto: CreateEmployerDto,
  ): Promise<Employer> {
    return await this.employerService.create(createEmployerDto);
  }

  @Get()
  async findAll(): Promise<Employer[]> {
    return await this.employerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Employer | undefined> {
    return await this.employerService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmployerDto: UpdateEmployerDto,
  ): Promise<Employer> {
    return await this.employerService.update(id, updateEmployerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Employer> {
    return await this.employerService.remove(id);
  }
}
