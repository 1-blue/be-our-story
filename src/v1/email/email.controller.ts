import { Controller, Post, Body, HttpCode } from "@nestjs/common";

import { EmailService } from "src/v1/email/email.service";
import { SendTokenDto } from "src/v1/email/dto/send-token.dto";
import { AuthenticateDto } from "src/v1/email/dto/authenticateDto.dto";

@Controller("api/v1/email")
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post("send-token")
  @HttpCode(200)
  sendToken(@Body() sendTokenDto: SendTokenDto) {
    return this.emailService.sendToken(sendTokenDto);
  }

  @Post("authenticate")
  @HttpCode(200)
  authenticate(@Body() vefifyDto: AuthenticateDto) {
    return this.emailService.authenticate(vefifyDto);
  }
}
