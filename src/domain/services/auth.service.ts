import { REPOSITORIES } from '@/constants';
import type { BaseRepository } from '@/shared/repository';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../entities/user';
import type { CreateUserDTO } from '@/application/dtos';
import { ConflictException, RecordNotFoundException } from '@/application/exceptions';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SigninDTO } from '@/application/dtos/auth/signin.dto';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(REPOSITORIES.USER) private readonly repository: BaseRepository<User>,
    @Inject(JwtService) private readonly jwtService: JwtService
  ) { }

  async signup(data: CreateUserDTO) {
    return this.userService.create(data);
  }

  async signin(data: SigninDTO) {
    const existingUser = await this.repository.findOne({ email: data.email },true);
    if (!existingUser) throw new RecordNotFoundException(User.name, 'email', data.email);
    if (!compareSync(data.password, existingUser.password)) throw new UnauthorizedException();
    const payload = {email: existingUser.email, _id: existingUser._id};
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
