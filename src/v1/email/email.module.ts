import { Module } from "@nestjs/common";

import { EmailService } from "src/v1/email/email.service";
import { EmailController } from "src/v1/email/email.controller";

@Module({
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
