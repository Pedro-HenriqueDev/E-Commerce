import { forwardRef, Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { EmailModule } from 'src/emails/email.module';
import { JwtModule } from '@nestjs/jwt';
import { HelpersModule } from 'src/helpers/helpers.module';

@Module({
  imports: [HelpersModule ,forwardRef(() => AuthModule), EmailModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {expiresIn: "30d"}
  })],
  controllers: [DoctorsController],
  providers: [DoctorsService, PrismaService],
  exports: [DoctorsService]
})
export class DoctorsModule {}
