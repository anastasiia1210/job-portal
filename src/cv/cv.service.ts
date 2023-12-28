import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCVDto } from './dto/create-cv.dto';
import { UpdateCVDto } from './dto/update-cv.dto';
import { CV } from './cv.entity';
import { Seeker } from '../seeker/seeker.entity';
import { JobCategory } from '../job-category/job-category.entity';

@Injectable()
export class CVService {
  async create(createCVDto: CreateCVDto): Promise<CV> {
    try {
      const seeker = await Seeker.findOneOrFail(createCVDto.seekerId);
      const category = await JobCategory.findOneOrFail(createCVDto.categoryId);

      const cv = CV.create(createCVDto);
      cv.seeker = seeker;
      cv.category = category;
      return await cv.save();
    } catch (error) {
      throw new HttpException(
        `Seeker or category not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAll(): Promise<CV[]> {
    const cvs: CV[] = await CV.find();
    return cvs;
  }

  async findOne(id: string): Promise<CV | undefined> {
    return await CV.findOne(id);
  }

  async update(id: string, updateCVDto: UpdateCVDto): Promise<CV> {
    const cv = await CV.findOne(id);
    if (!cv) {
      throw new HttpException(
        'CV with id ${id} not found',
        HttpStatus.NOT_FOUND,
      );
    }
    try {
      Object.assign(cv, updateCVDto);
      if (updateCVDto.seekerId) {
        const seeker = await Seeker.findOneOrFail(updateCVDto.seekerId);
        cv.seeker = seeker;
      }
      if (updateCVDto.categoryId) {
        const category = await JobCategory.findOneOrFail(
          updateCVDto.categoryId,
        );
        cv.category = category;
      }
      return await CV.save(cv);
    } catch (error) {
      throw new HttpException(
        'Seeker or category not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: string): Promise<CV> {
    try {
      const cv: CV | undefined = await CV.findOne(id);
      await cv.remove();
      return cv;
    } catch (error) {
      throw new HttpException('CV not found', HttpStatus.NOT_FOUND);
    }
  }
}
