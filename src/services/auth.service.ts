import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDTO, IdentityCheckDTO, SigninDTO } from "core/dtos";
import { UsersService } from "./users.service";
import { RecordNotFoundException } from "shared/exceptions";
import { compareSync } from "bcrypt";
import { isEmpty } from "class-validator";
import { FindUserUseCase } from "./use-cases";
import { UserEntity } from "core/domain/entities";
import { JWT_EXPIRATION, JWT_SECRET } from "@/constants";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly findUserUseCase: FindUserUseCase,
  ) { }

  private getJWTPayload(user: UserEntity) {
    return {
      email: user.email,
      mobile_phone: user.mobile_phone,
      name: user.name,
      _id: user._id
    };
  }

  async signup(data: CreateUserDTO) {
    const item = await this.userService.create(data);
    return {
      access_token: this.jwtService.sign(this.getJWTPayload(item))
    };
  }

  async signin(data: SigninDTO) {
    if (isEmpty(data.email) && isEmpty(data.mobile_phone)) throw new UnauthorizedException('Email or Mobile Phone is required');
    const existingUser = await this.userService.findOne({ email: data.email }, false);
    if (!existingUser) throw new RecordNotFoundException('user', 'email', data.email);
    if (!compareSync(data.password, existingUser.password)) throw new UnauthorizedException();
    return {
      access_token: this.jwtService.sign(this.getJWTPayload(existingUser), {
        expiresIn: JWT_EXPIRATION
      })
    };
  }

  async identityCheck(data: IdentityCheckDTO) {
    const item = await this.findUserUseCase.execute(data);
    return {
      data: item?._id
    };
  }
}