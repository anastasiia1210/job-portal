import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SeekerService } from './seeker.service';
import { CreateSeekerDto } from './dto/create-seeker.dto';
import { UpdateSeekerDto } from './dto/update-seeker.dto';
import { Seeker } from './seeker.entity';

@Controller('seeker')
export class SeekerController {
  constructor(private readonly seekerService: SeekerService) {}

  @Post()
  async create(@Body() createSeekerDto: CreateSeekerDto): Promise<Seeker> {
    return await this.seekerService.create(createSeekerDto);
  }

  @Get()
  async findAll() {
    return await this.seekerService.findAll();
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
