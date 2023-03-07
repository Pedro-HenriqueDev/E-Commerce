import { Body, Controller, Post } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { createDoctorDto } from './dtos/doctor.dto';

@Controller()
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post('doctors')
  async create(@Body() doctor: createDoctorDto) {
    return await this.doctorsService.create(doctor)
  }
}
