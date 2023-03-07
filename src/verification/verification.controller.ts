import { Controller, Get } from "@nestjs/common";

@Controller()
export class VerificationController {

    @Get("verification/:token")
    async verification() {
        return "Verification completed!"
    }
}