import { Entity } from "@/core/base";

export class UserEntity extends Entity {
  public email: string;
  public password: string;
  public name: string;
  public group: any;
  public status: string;
  public createdAt: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;
}

export type UserWithoutPassword = Omit<UserEntity, 'password'>;