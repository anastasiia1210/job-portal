import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './company.entity';

@Injectable()
export class CompanyService {
  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const company = Company.create(createCompanyDto);
    return await company.save();
  }

  async findAll(): Promise<Company[]> {
    const companies: Company[] = await Company.find();
    return companies;
  }

  async findOne(id: string): Promise<Company | undefined> {
    return await Company.findOne(id, { relations: ['jobOffers'] });
  }

  async update(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    const company = await Company.findOne(id);

    if (!company) {
      throw new HttpException(
        'Company with id ${id} not found',
        HttpStatus.BAD_REQUEST,
      );
    }
    Object.assign(company, updateCompanyDto);
    return await Company.save(company);
  }

  async remove(id: string): Promise<Company> {
    try {
      const company: Company | undefined = await Company.findOne(id);

      if (!company) {
        throw new HttpException(
          'Company with id ${id} not found',
          HttpStatus.BAD_REQUEST,
        );
      }
      await company.remove();
      return company;
    } catch (error) {
      throw new HttpException('Error delete company', HttpStatus.BAD_REQUEST);
    }
  }
}
