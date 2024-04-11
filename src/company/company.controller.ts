import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, Res, Put
} from "@nestjs/common";
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './company.entity';
import { Response } from "express";

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto): Promise<Company> {
    return await this.companyService.create(createCompanyDto);
  }

  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    const companies: Company[] = await this.companyService.findAll();
    const totalCount = companies.length;
    res.setHeader(
      'Content-Range',
      `company 0-${companies.length - 1}/${totalCount}`,
    );
    res.json(companies);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Company | undefined> {
    return await this.companyService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    return await this.companyService.update(id, updateCompanyDto);
  }

  @Put(':id')
  async updatePut(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    return await this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Company> {
    return await this.companyService.remove(id);
  }
}
