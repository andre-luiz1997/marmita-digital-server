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
import { GROUPS } from "@/permissions";
import { TenantsService } from "./tenants.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly tenantsService: TenantsService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly findUserUseCase: FindUserUseCase,
  ) { }

  private getJWTPayload(user: UserEntity) {
    return {
      email: user.email,
      mobile_phone: user.mobile_phone,
      name: user.name,
      tenant: user.tenant,
      _id: user._id
    };
  }

  async signup(data: CreateUserDTO) {
    if (data.group === GROUPS.TENANT_ADMIN) {
      if (!data.tenant) throw new UnauthorizedException('Tenant is required');
      const tenant = data.tenant?._id ? data.tenant : await this.tenantsService.create(data.tenant);
      data.tenant = tenant;
    }
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
    const filter: any = {}
    if (!isEmpty(data.email)) filter.email = data.email;
    if (!isEmpty(data.mobile_phone)) filter.mobile_phone = data.mobile_phone;
    if (data.isTenantAdmin) filter.group = GROUPS.TENANT_ADMIN;

    const item = await this.findUserUseCase.execute(filter);
    return {
      data: item?._id
    };
  }
}