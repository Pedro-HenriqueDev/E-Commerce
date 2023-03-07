import {  forwardRef, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PatientsModule } from 'src/patients/patients.module';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtMiddlewarePatients } from './middlewares/Jwt-validate.middleware';
import { User } from './models/UserModel'
import { LoginValidationMiddleware } from './middlewares/login.middleware'
import { JwtMiddlewareDoctors } from './middlewares/jwt-validate-doctors.middleware';

@Module({
  imports: [ forwardRef(() => PatientsModule), forwardRef(() => DoctorsModule), JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {expiresIn: "30d"}
  })],
  controllers: [AuthController],
  providers: [AuthService, JwtMiddlewarePatients, JwtMiddlewareDoctors, User],
  exports: [ User, JwtMiddlewarePatients, JwtMiddlewareDoctors, AuthService ]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoginValidationMiddleware)
      .forRoutes("login");
    consumer
      .apply(JwtMiddlewarePatients)
      .forRoutes("oi")  
  }
}