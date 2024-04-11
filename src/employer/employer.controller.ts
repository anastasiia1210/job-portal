import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, Res, Put
} from "@nestjs/common";
import { EmployerService } from './employer.service';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { Employer } from './employer.entity';
import { Response } from "express";

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
  async findAll(@Res() res: Response): Promise<void> {
    const employers: Employer[] = await this.employerService.findAll();
    const totalCount = employers.length;
    res.setHeader(
      'Content-Range',
      `employer 0-${employers.length - 1}/${totalCount}`,
    );
    res.json(employers);
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

  @Put(':id')
  async updatePut(
    @Param('id') id: string,
    @Body() updateEmployerDto: UpdateEmployerDto,
  ): Promise<Employer> {
    return await this.employerService.update(id, updateEmployerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Employer> {
    return await this.employerService.remove(id);
  }

  @Get('email/:email')
  async findByEmail(
    @Param('email') email: string,
  ): Promise<Employer | undefined> {
    return await this.employerService.findByEmail(email);
  }
}
