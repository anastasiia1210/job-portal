import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateSeekerDto } from './dto/create-seeker.dto';
import { UpdateSeekerDto } from './dto/update-seeker.dto';
import { Seeker } from './seeker.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class SeekerService {
  async create(createSeekerDto: CreateSeekerDto): Promise<Seeker> {
    const seeker = Seeker.create(createSeekerDto);
    return await seeker.save();
  }

  async findAll(): Promise<Seeker[]> {
    const seekers: Seeker[] = await Seeker.find();
    return seekers;
  }

  async findOne(id: string): Promise<Seeker | undefined> {
    try {
      return await Seeker.findOne(id);
    } catch (error) {
      throw new HttpException('Seeker not found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, updateSeekerDto: UpdateSeekerDto): Promise<Seeker> {
    const seeker = await Seeker.findOne(id);

    if (!seeker) {
      throw new HttpException(
        'Seeker with id ${id} not found',
        HttpStatus.BAD_REQUEST,
      );
    }

    Object.assign(seeker, updateSeekerDto);
    return await Seeker.save(seeker);
  }

  async remove(id: string): Promise<Seeker> {
    try {
      const seeker: Seeker | undefined = await Seeker.findOne(id);

      if (!seeker) {
        throw new HttpException(
          'Seeker with id ${id} not found',
          HttpStatus.BAD_REQUEST,
        );
      }
      await seeker.remove();
      return seeker;
    } catch (error) {
      throw new HttpException('Error delete Seeker', HttpStatus.BAD_REQUEST);
    }
  }

  async findByEmail(email: string): Promise<Seeker | undefined> {
    const seekerRepository = getRepository(Seeker);
    try {
      return await seekerRepository.findOne({ email });
    } catch (error) {
      throw new HttpException('Seeker not found', HttpStatus.NOT_FOUND);
    }
  }
}
