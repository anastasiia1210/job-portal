import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res, Put
} from "@nestjs/common";
import { CVService } from './cv.service';
import { CreateCVDto } from './dto/create-cv.dto';
import { UpdateCVDto } from './dto/update-cv.dto';
import { CV } from './cv.entity';
import { Response } from 'express';

@Controller('cv')
export class CVController {
  constructor(private readonly cvService: CVService) {}

  @Post()
  async create(@Body() createCvDto: CreateCVDto): Promise<CV> {
    return await this.cvService.create(createCvDto);
  }

  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    const cvs: CV[] = await this.cvService.findAll();
    const totalCount = cvs.length;
    res.setHeader('Content-Range', `cv 0-${cvs.length - 1}/${totalCount}`);
    res.json(cvs);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CV | undefined> {
    return await this.cvService.findOne(id);
  }

  @Get('seeker/:id')
  async findAllofOneSeeker(@Param('id') id: string): Promise<CV[]> {
    return await this.cvService.findAllofOneSeeker(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCVDto: UpdateCVDto,
  ): Promise<CV> {
    return await this.cvService.update(id, updateCVDto);
  }

  @Put(':id')
  async updatePut(
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
