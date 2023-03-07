import { forwardRef, Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { EmailModule } from 'src/emails/email.module';
import { JwtModule } from '@nestjs/jwt';
import { HelpersModule } from 'src/helpers/helpers.module';

@Module({
  imports: [HelpersModule ,forwardRef(() => AuthModule), EmailModule ,JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {expiresIn: "30d"}
  })],
  controllers: [PatientsController],
  providers: [ PatientsService, PrismaService],
  exports: [PatientsService]
})
export class PatientsModule {}
