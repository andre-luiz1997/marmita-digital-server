import { Entity } from "@/core/base";
import { Permission } from "@/permissions";

export class GroupEntity extends Entity {
  public name: string;
  public permissions: Permission[];
  public createdAt: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;
}