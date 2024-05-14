import { Entity } from "core/base";

export class TenantEntity extends Entity {
  public name: string;
  public status: string;
  public createdAt: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;
}