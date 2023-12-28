import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CVService } from './cv.service';
import { CreateCVDto } from './dto/create-cv.dto';
import { UpdateCVDto } from './dto/update-cv.dto';
import { CV } from './cv.entity';

@Controller('cv')
export class CVController {
  constructor(private readonly cvService: CVService) {}

  @Post()
  async create(@Body() createCvDto: CreateCVDto): Promise<CV> {
    return await this.cvService.create(createCvDto);
  }

  @Get()
  async findAll(): Promise<CV[]> {
    return await this.cvService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CV | undefined> {
    return await this.cvService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCVDto: UpdateCVDto,
  ): Promise<CV> {
    return await this.cvService.update(id, updateCVDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<CV> {
    return await this.cvService.remove(id);
  }
}
