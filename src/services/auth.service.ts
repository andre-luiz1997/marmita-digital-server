import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDTO, SigninDTO } from "core/dtos";
import { UsersService } from "./users.service";
import { RecordNotFoundException } from "shared/exceptions";
import { compareSync } from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async signup(data: CreateUserDTO) {
    return this.userService.create(data);
  }

  async signin(data: SigninDTO) {
    const existingUser = await this.userService.findOne({ email: data.email }, false);
    if (!existingUser) throw new RecordNotFoundException('user', 'email', data.email);
    if (!compareSync(data.password, existingUser.password)) throw new UnauthorizedException();
    const payload = { email: existingUser.email, _id: existingUser._id };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}