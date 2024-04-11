import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from "./admin.entity";

@Injectable()
export class AdminService {

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    try {
      const admin = Admin.create(createAdminDto);
      return await admin.save();
    } catch (error) {
      throw new HttpException('Error delete admin', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Admin[]> {
    const admins: Admin[] = await Admin.find();
    return admins;
  }

  async findOne(id: string) {
    return await Admin.findOne(id);
  }

  async update(
    id: string,
    updatedAdmin: UpdateAdminDto,
  ): Promise<Admin> {
    const admin = await Admin.findOne(id);

    if (!admin) {
      throw new HttpException(
        'Admin with id ${id} not found',
        HttpStatus.NOT_FOUND,
      );
    }
    Object.assign(admin, updatedAdmin);
    return await Admin.save(admin);
  }

  async remove(id: string): Promise<Admin> {
    try {
      const admin: Admin | undefined = await Admin.findOne(id);

      if (!admin) {
        throw new HttpException(
          'Admin with id ${id} not found',
          HttpStatus.BAD_REQUEST,
        );
      }
      await admin.remove();
      return admin;
    } catch (error) {
      throw new HttpException('Error delete admin', HttpStatus.BAD_REQUEST);
    }
  }
}
