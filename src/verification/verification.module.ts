import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { DoctorsModule } from "src/doctors/doctors.module";
import { PatientsModule } from "src/patients/patients.module";
import { VerificationJwt } from "./middlewares/verificationJwt.middleware";
import { VerificationController } from "./verification.controller";

@Module({
    imports: [ PatientsModule, DoctorsModule, JwtModule, JwtModule],
      providers: [VerificationJwt],
    controllers: [VerificationController]
})

export class VerificationModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(VerificationJwt)
            .forRoutes("verification/:token")
    }
}