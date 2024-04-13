import { CACHE_MANAGER } from "@nestjs/cache-manager";
import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Cache } from "cache-manager";
import * as nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

import { SendTokenDto } from "src/v1/email/dto/send-token.dto";
import { AuthenticateDto } from "src/v1/email/dto/authenticateDto.dto";

// 메일 욥선 타입. 수신자(to), 메일 제목, html 형식의 메일 본문을 가짐
interface EmailOptions
  extends Pick<Mail.Options, "from" | "to" | "subject" | "html"> {}

@Injectable()
export class EmailService {
  private transporter: Mail;
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {
    this.transporter = nodemailer.createTransport({
      service: "naver",
      host: process.env.NAVER_SMTP_SERVER_NAME,
      port: Number(process.env.NAVER_SMTP_SERVER_PORT),
      auth: {
        user: process.env.NAVER_APP_EMAIL,
        pass: process.env.NAVER_APP_PASSWORD,
      },
    });
  }

  async sendToken({ email }: SendTokenDto) {
    const RANDOM_NUMBER = Math.floor(Math.random() * 900_000) + 100000;

    const mailOptions: EmailOptions = {
      from: process.env.NAVER_APP_EMAIL,
      to: email,
      subject: "[nosvc] 회원가입 이메일 인증번호",
      html: `인증번호: ${RANDOM_NUMBER}`,
    };

    // redis에 인증번호 저장
    if (process.env.NODE_ENV === "development") {
      await this.cacheManager.set(email, 111111);
    } else {
      await this.cacheManager.set(email, RANDOM_NUMBER);

      // transporter 객체를 이용해 메일 전송
      return await this.transporter.sendMail(mailOptions);
    }
  }

  async authenticate({ email, token }: AuthenticateDto) {
    const savedToken = await this.cacheManager.get(email);

    if (typeof savedToken !== "number") {
      throw new ForbiddenException(
        "해당 이메일과 일치하는 토큰이 존재하지 않습니다.",
      );
    }
    if (+savedToken !== +token) {
      throw new UnauthorizedException("유효하지 않은 토큰입니다.");
    }

    return {};
  }
}
