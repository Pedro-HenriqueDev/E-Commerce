import { forwardRef, Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [AdminsController],
  providers: [AdminsService, PrismaService],
  exports: [AdminsService]
})
export class AdminsModule {}
