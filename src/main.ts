import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import * as passport from "passport";

import { AppModule } from "src/app.module";

const bootstrap = async () => {
  try {
    const app = await NestFactory.create(AppModule);

    // cors
    app.enableCors({
      credentials: true,
      origin: [process.env.CLIENT_URL],
    });

    // cookie
    app.use(cookieParser());

    // session ( passport )
    app.use(
      session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
          httpOnly: true,
          sameSite: "lax",
        },
      }),
    );
    app.use(passport.initialize());
    app.use(passport.session());

    // DTO에서 정의된 값만 받도록 체크
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: {
          // string 형식으로 들어오는 number | boolean 자동 형변환 실행하는 옵션
          enableImplicitConversion: true,
        },
      }),
    );

    await app.listen(process.env.PORT);

    console.log(`🚀 ${process.env.PORT}번 서버 연결 성공 !!`);
  } catch (error) {
    console.error("🚀 서버 연결 실패 >> ", error);
  }
};

bootstrap();
