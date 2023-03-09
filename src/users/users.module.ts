import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailModule } from 'src/emails/email.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [EmailModule, forwardRef(() => AuthModule), JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {expiresIn: "30d"}
  })],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService]
})
export class UsersModule {}
