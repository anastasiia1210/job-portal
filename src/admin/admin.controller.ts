import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Put } from "@nestjs/common";
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Response } from "express";
import { Admin } from './admin.entity';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async create(
    @Body() createAdminDto: CreateAdminDto,
  ): Promise<Admin> {
    return await this.adminService.create(createAdminDto);
  }

  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    const admins: Admin[] = await this.adminService.findAll();
    const totalCount = admins.length;
    res.setHeader(
      'Content-Range',
      `admin 0-${admins.length - 1}/${totalCount}`,
    );
    res.json(admins);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Admin | undefined> {
    return await this.adminService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return await this.adminService.update(id, updateAdminDto);
  }

  @Put(':id')
  async updatePut(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return await this.adminService.update(id, updateAdminDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.adminService.remove(id);
  }
}
