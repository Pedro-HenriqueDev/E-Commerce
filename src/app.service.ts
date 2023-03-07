import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getHello() {
    const patients = await this.prisma.patients.findMany()
    const doctors = await this.prisma.doctors.findMany()

    return {
      patients,
      doctors
    }
  }
}
