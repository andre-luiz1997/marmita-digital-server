import { TenantEntity, UserEntity } from "core/domain/entities";
import { Request } from "express";

export interface CustomRequest extends Request {
  user?: UserEntity;
  tenant?: TenantEntity;
}