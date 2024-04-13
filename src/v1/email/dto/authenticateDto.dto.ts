import { IsEmail, IsNotEmpty, Matches } from "class-validator";

export class AuthenticateDto {
  @IsNotEmpty({ message: "이메일은 필수값입니다." })
  @IsEmail(undefined, { message: "이메일 형태만 입력이 가능합니다." })
  email: string;

  @IsNotEmpty({ message: "토큰은 필수값입니다." })
  @Matches(/^[0-9]{6}$/, { message: "유효하지 않은 토큰입니다." })
  token: string;
}
