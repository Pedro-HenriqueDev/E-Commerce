import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AdminsModule } from "src/admins/admins.module";
import { UsersModule } from "src/users/users.module";
import { VerificationJwt } from "./middlewares/verificationJwt.middleware";
import { VerificationController } from "./verification.controller";

@Module({
    imports: [ UsersModule, AdminsModule, JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: {expiresIn: "30d"}
      })],
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