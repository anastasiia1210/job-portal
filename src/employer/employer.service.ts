import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { Employer } from './employer.entity';
import { Company } from '../company/company.entity';
import { getRepository } from "typeorm";

@Injectable()
export class EmployerService {
  async create(createEmployerDto: CreateEmployerDto): Promise<Employer> {
    try {
      const company = await Company.findOneOrFail(createEmployerDto.companyId);

      const employer = Employer.create(createEmployerDto);
      employer.company = company;
      return await employer.save();
    } catch (error) {
      throw new HttpException(
        `Company with id ${createEmployerDto.companyId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAll(): Promise<Employer[]> {
    const employers: Employer[] = await Employer.find({
      relations: ['company'],
    });
    return employers;
  }

  async findOne(id: string): Promise<Employer | undefined> {
    return await Employer.findOne(id, {
      relations: ['company'],
    });
  }

  async update(
    id: string,
    updateEmployerDto: UpdateEmployerDto,
  ): Promise<Employer> {
    const employer = await Employer.findOne(id);

    if (!employer) {
      throw new HttpException(
        'Employer with id ${id} not found',
        HttpStatus.NOT_FOUND,
      );
    }
    Object.assign(employer, updateEmployerDto);
    if (updateEmployerDto.companyId) {
      const company = await Company.findOneOrFail(updateEmployerDto.companyId);
      employer.company = company;
    }
    return await Employer.save(employer);
  }

  async remove(id: string): Promise<Employer> {
    try {
      const employer: Employer | undefined = await Employer.findOne(id);

      if (!employer) {
        throw new HttpException(
          'Employer with id ${id} not found',
          HttpStatus.BAD_REQUEST,
        );
      }
      await employer.remove();
      return employer;
    } catch (error) {
      throw new HttpException('Error delete employer', HttpStatus.BAD_REQUEST);
    }
  }

  async findByEmail(email: string): Promise<Employer | undefined> {
    const employerRepository = getRepository(Employer);
    try {
      return await employerRepository.findOne({ email });
    } catch (error) {
      throw new HttpException('Employer not found', HttpStatus.NOT_FOUND);
    }
  }
}
