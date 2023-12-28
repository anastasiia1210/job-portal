import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateJobCategoryDto } from './dto/create-job-category.dto';
import { UpdateJobCategoryDto } from './dto/update-job-category.dto';
import { JobCategory } from './job-category.entity';

@Injectable()
export class JobCategoryService {
  async create(
    createJobCategoryDto: CreateJobCategoryDto,
  ): Promise<JobCategory> {
    const category = JobCategory.create(createJobCategoryDto);
    return await category.save();
  }

  async findAll(): Promise<JobCategory[]> {
    const categories: JobCategory[] = await JobCategory.find();
    return categories;
  }

  async findOne(id: string): Promise<JobCategory | undefined> {
    return await JobCategory.findOne(id, { relations: ['jobOffers', 'cvs'] });
  }

  async update(
    id: string,
    updateJobCategoryDto: UpdateJobCategoryDto,
  ): Promise<JobCategory> {
    const category = await JobCategory.findOne(id);

    if (!category) {
      throw new HttpException(
        'Category with id ${id} not found',
        HttpStatus.BAD_REQUEST,
      );
    }
    Object.assign(category, updateJobCategoryDto);
    return await JobCategory.save(category);
  }

  async remove(id: string): Promise<JobCategory> {
    try {
      const category: JobCategory | undefined = await JobCategory.findOne(id);

      if (!category) {
        throw new HttpException(
          'Category with id ${id} not found',
          HttpStatus.BAD_REQUEST,
        );
      }
      await category.remove();
      return category;
    } catch (error) {
      throw new HttpException('Error delete category', HttpStatus.BAD_REQUEST);
    }
  }
}
