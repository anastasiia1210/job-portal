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
import { SeekerService } from './seeker.service';
import { CreateSeekerDto } from './dto/create-seeker.dto';
import { UpdateSeekerDto } from './dto/update-seeker.dto';
import { Seeker } from './seeker.entity';
import { Response } from 'express';

@Controller('seeker')
export class SeekerController {
  constructor(private readonly seekerService: SeekerService) {}

  @Post()
  async create(@Body() createSeekerDto: CreateSeekerDto): Promise<Seeker> {
    return await this.seekerService.create(createSeekerDto);
  }

  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    const seekers: Seeker[] = await this.seekerService.findAll();
    const totalCount = seekers.length; // Assuming you're fetching all seekers
    res.setHeader(
      'Content-Range',
      `seeker 0-${seekers.length - 1}/${totalCount}`,
    );
    res.json(seekers);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Seeker | undefined> {
    return await this.seekerService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSeekerDto: UpdateSeekerDto,
  ): Promise<Seeker> {
    return await this.seekerService.update(id, updateSeekerDto);
  }

  @Put(':id')
  async updatePut(
    @Param('id') id: string,
    @Body() updateSeekerDto: UpdateSeekerDto,
  ): Promise<Seeker | undefined> {
    return await this.seekerService.update(id, updateSeekerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Seeker> {
    return await this.seekerService.remove(id);
  }

  @Get('email/:email')
  async findByEmail(
    @Param('email') email: string,
  ): Promise<Seeker | undefined> {
    return await this.seekerService.findByEmail(email);
  }
}
