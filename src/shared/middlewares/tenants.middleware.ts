import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { TenantsService } from 'services/tenants.service';
import { CustomRequest } from 'shared/types';

@Injectable()
export class TenantsMiddleware implements NestMiddleware {
  constructor(
    private readonly tenantsService: TenantsService,
  ) {}

  async use(req: CustomRequest, res: Response, next: () => void) {
    const tenantId = req.headers['x-tenant-id'] as string;
    if(!tenantId) {
      next();
      return;
    }
    const tenant = await this.tenantsService.findOneById(tenantId);
    req.tenant = tenant;
    next();
  }
}
