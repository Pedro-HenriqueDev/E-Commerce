import {  forwardRef, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtMiddlewarePatients } from './middlewares/Jwt-validate.middleware';
import { LoginValidationMiddleware } from './middlewares/login.middleware'
import { JwtMiddlewareDoctors } from './middlewares/jwt-validate-doctors.middleware';
import { AdminsModule } from 'src/admins/admins.module';

@Module({
  imports: [ forwardRef(() => UsersModule), forwardRef(() => AdminsModule), JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {expiresIn: "30d"}
  })],
  controllers: [AuthController],
  providers: [AuthService, JwtMiddlewarePatients, JwtMiddlewareDoctors],
  exports: [ JwtMiddlewarePatients, JwtMiddlewareDoctors, AuthService ]
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