import { Entity } from "@/core/base";
import { GROUPS } from "@/permissions";
import { Phone } from "../phone";

export class UserEntity extends Entity {
  public email: string;
  public mobile_phone: Phone;
  public password: string;
  public name: string;
  public group: GROUPS;
  public status: string;
  public createdAt: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;
}

export type UserWithoutPassword = Omit<UserEntity, 'password'>;