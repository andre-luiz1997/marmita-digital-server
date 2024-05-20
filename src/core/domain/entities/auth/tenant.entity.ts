import { Entity } from "core/base";
import { Billing } from "../saas";

export class TenantEntity extends Entity {
  public name: string;
  public billing?: Billing;
  public status: string;
  public createdAt: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;
}