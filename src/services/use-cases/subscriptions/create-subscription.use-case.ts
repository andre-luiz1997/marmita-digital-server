import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { UseCase } from "core/base";
import { SubscriptionEntity } from "core/domain/entities";
import { CreateSubscriptionDTO } from "core/dtos";
import { SubscriptionRepository } from "core/repositories";
import { PlansService } from "services/plans.service";
import { TenantsService } from "services/tenants.service";
import { FindTenantByIdUseCase } from "../tenants/find-tenant-by-id.use-case";
import { FindPlanByIdUseCase } from "../plans";
import { RecordNotFoundException, ValidationException } from "shared/exceptions";
import { STATUSES } from "shared/types";

@Injectable()
export class CreateSubscriptionUseCase implements UseCase<SubscriptionEntity> {

  constructor(
    private readonly findTenantByIdUseCase: FindTenantByIdUseCase,
    private readonly findPlanByIdUseCase: FindPlanByIdUseCase,
    private readonly subscriptionsRepository: SubscriptionRepository,
  ) { }

  async execute(data: CreateSubscriptionDTO): Promise<SubscriptionEntity> {
    if(!data.tenant._id || !data.plan._id) throw new ValidationException("Tenant and Plan are required.");
    const tenant = await this.findTenantByIdUseCase.execute(data.tenant._id);
    const plan = await this.findPlanByIdUseCase.execute(data.plan._id);
    if(!tenant) throw new RecordNotFoundException('tenant', '_id', data.tenant._id);
    if(!plan) throw new RecordNotFoundException('plan', '_id', data.plan._id);
    const subscription = new SubscriptionEntity();
    subscription.tenant = tenant;
    subscription.plan = plan;
    subscription.pricing = plan.pricing;
    subscription.status = STATUSES[0];
    return this.subscriptionsRepository.create(subscription);
  }
}