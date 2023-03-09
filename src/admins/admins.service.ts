import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Admin } from './entities/Admin';

@Injectable()
export class AdminsService {
    constructor(private readonly prisma: PrismaService){}

    async findByEmail(email: string): Promise<Admin> {
        return await this.prisma.users.findUnique({where: {email}})
    }
    async verification(email: string) {
        if(!await this.findByEmail(email)) throw new NotFoundException("account not found")

        return await this.prisma.users.update({where: {email},data: {isVerificate: true}})
    }
}
