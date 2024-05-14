import { TenantEntity } from "core/domain/entities";
import { Request } from "express";

export interface CustomRequest extends Request {
  tenant: TenantEntity;
}