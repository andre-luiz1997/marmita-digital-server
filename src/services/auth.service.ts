import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDTO, IdentityCheckDTO, SigninDTO } from "core/dtos";
import { UsersService } from "./users.service";
import { RecordNotFoundException } from "shared/exceptions";
import { compareSync } from "bcrypt";
import { isEmpty } from "class-validator";
import { FindUserUseCase } from "./use-cases";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly findUserUseCase: FindUserUseCase,
  ) { }

  async signup(data: CreateUserDTO) {
    return this.userService.create(data);
  }

  async signin(data: SigninDTO) {
    if(isEmpty(data.email) && isEmpty(data.mobile_phone)) throw new UnauthorizedException('Email or Mobile Phone is required');
    const existingUser = await this.userService.findOne({ email: data.email }, false);
    if (!existingUser) throw new RecordNotFoundException('user', 'email', data.email);
    if (!compareSync(data.password, existingUser.password)) throw new UnauthorizedException();
    const payload = { email: existingUser.email, _id: existingUser._id };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  async identityCheck(data: IdentityCheckDTO) {
    const item = await this.findUserUseCase.execute(data);
    return {
      data: item?._id
    };
  }
}