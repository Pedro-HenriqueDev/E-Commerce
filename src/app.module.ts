import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { VerificationModule } from './verification/verification.module';
import { UsersModule } from './users/users.module';
import { AdminsModule } from './admins/admins.module';

@Module({
  imports: [AuthModule, VerificationModule, UsersModule, AdminsModule ],
  controllers: [AppController],
  providers: [AppService, PrismaService]
})

export class AppModule {}
