import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

import { PrismaService } from "src/v0/prisma/prisma.service";
import { AuthController } from "src/v1/auth/auth.controller";
import { AuthService } from "src/v1/auth/auth.service";
import { UsersService } from "src/v1/users/users.service";
import { ImagesService } from "src/v1/images/images.service";
import { MyPassportSerializer } from "src/v1/auth/passport/passport.serializer";
import { LocalStrategy } from "src/v1/auth/local/local.strategy";
import { KakaoStrategy } from "src/v1/auth/kakao/kakao.strategy";
import { GoogleStrategy } from "src/v1/auth/google/google.strategy";

@Module({
  imports: [PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    UsersService,
    ImagesService,
    MyPassportSerializer,
    LocalStrategy,
    KakaoStrategy,
    GoogleStrategy,
  ],
})
export class AuthModule {}
