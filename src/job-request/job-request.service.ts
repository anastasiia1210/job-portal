import { Injectable } from '@nestjs/common';
import { CreateJobRequestDto } from './dto/create-job-request.dto';
import { UpdateJobRequestDto } from './dto/update-job-request.dto';

@Injectable()
export class JobRequestService {
  create(createJobRequestDto: CreateJobRequestDto) {
    return 'This action adds a new jobRequest';
  }

  findAll() {
    return `This action returns all jobRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobRequest`;
  }

  update(id: number, updateJobRequestDto: UpdateJobRequestDto) {
    return `This action updates a #${id} jobRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobRequest`;
  }
}
