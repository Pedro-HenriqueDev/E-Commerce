import { Body, Controller, Delete, Post } from '@nestjs/common';
import { createUserDto } from './dtos/patient.dto';
import { PatientsService } from './patients.service';

@Controller()
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post("patients")
  async create(@Body() user: createUserDto) {
    return await this.patientsService.create(user)
  }
}
