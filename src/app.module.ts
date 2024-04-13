import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CacheModule } from "@nestjs/cache-manager";
import * as redisStore from "cache-manager-redis-store";
import type { ClientOpts } from "redis";

import { PrismaService } from "src/v0/prisma/prisma.service";
import { CatsModule } from "src/v1/cats/cats.module";
import { ImagesModule } from "src/v1/images/images.module";
import { UsersModule } from "src/v1/users/users.module";
import { AuthModule } from "src/v1/auth/auth.module";
import { EmailModule } from "src/v1/email/email.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    CacheModule.register<ClientOpts>({
      isGlobal: true,
      store: redisStore,
      // TODO:
      url:
        process.env.NODE_ENV === "development" ? "redis://localhost:6379" : "",
      // 5분
      ttl: 60 * 5,
    }),
    CatsModule,
    ImagesModule,
    UsersModule,
    AuthModule,
    EmailModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
