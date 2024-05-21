import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { UseCase } from "core/base";
import { SubscriptionEntity, SubscriptionPayment } from "core/domain/entities";
import { CreateSubscriptionDTO, CreateTransactionDTO } from "core/dtos";
import { SubscriptionRepository } from "core/repositories";
import { PlansService } from "services/plans.service";
import { TenantsService } from "services/tenants.service";
import { FindTenantByIdUseCase } from "../tenants/find-tenant-by-id.use-case";
import { FindPlanByIdUseCase } from "../plans";
import { RecordNotFoundException, ValidationException } from "shared/exceptions";
import { STATUSES } from "shared/types";
import { Crypto } from "crypto/crypto";
import { PAYMENT_METHODS, TRANSACTION_GATEWAYS } from "@/constants";
import { CreateTransactionUseCase } from "../payments";
import { UpdateTenantUseCase } from "../tenants/update-tenant.use-case";
import { validate } from "class-validator";

@Injectable()
export class CreateSubscriptionUseCase implements UseCase<SubscriptionEntity> {
  crypto = Crypto.getInstance();

  constructor(
    private readonly findTenantByIdUseCase: FindTenantByIdUseCase,
    private readonly findPlanByIdUseCase: FindPlanByIdUseCase,
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly subscriptionsRepository: SubscriptionRepository,
    private readonly updateTenantUseCase: UpdateTenantUseCase
  ) { }

  async execute(data: CreateSubscriptionDTO): Promise<SubscriptionEntity> {
    if (!data.tenant._id || !data.plan._id) throw new ValidationException("Tenant and Plan are required.");
    const tenant = await this.findTenantByIdUseCase.execute(data.tenant._id);
    const plan = await this.findPlanByIdUseCase.execute(data.plan._id);
    if (!tenant) throw new RecordNotFoundException('tenant', '_id', data.tenant._id);
    if (!plan) throw new RecordNotFoundException('plan', '_id', data.plan._id);
    if (!tenant.billing && !data.billing) throw new ValidationException('Billing information is required.');

    //UPDATE TENANT BILLING INFO
    if (!tenant.billing && data.billing) await this.updateTenantUseCase.execute(tenant._id, { billing: data.billing });

    //DECRYPT PAYMENT TOKEN
    const payment = JSON.parse(this.crypto.privateDecrypt(data.paymentToken));

    let subscription = new SubscriptionEntity();
    subscription.tenant = tenant;
    subscription.plan = plan;
    subscription.pricing = plan.pricing;
    subscription.status = STATUSES[0];
    subscription.payment = payment;
    subscription = await this.subscriptionsRepository.create(subscription);
    try {
      let transactionPayment: SubscriptionPayment;
      if (payment.method === PAYMENT_METHODS.CARD) {
        transactionPayment = {
          method: PAYMENT_METHODS.CARD,
          creditCard: payment.creditCard,
        }
      } else if (payment.method === PAYMENT_METHODS.PIX) {
        transactionPayment = {
          method: PAYMENT_METHODS.PIX,
        }
      }
      const billing = data.billing || tenant.billing;
      const dto: CreateTransactionDTO = {
        amount: plan.pricing.amount,
        plan,
        subscription,
        tenant: data.tenant,
        payment: transactionPayment,
        billing,
        gateway: TRANSACTION_GATEWAYS.PAGARME
      }
      console.log('🚀 ~ file: create-subscription.use-case.ts:73 ~ CreateSubscriptionUseCase ~ execute ~ dto 🚀 ➡➡', dto);
      const valid = await validate(CreateTransactionDTO.name, dto);      
      console.log('🚀 ~ file: create-subscription.use-case.ts:74 ~ CreateSubscriptionUseCase ~ execute ~ valid 🚀 ➡➡', valid);
      const res = await this.createTransactionUseCase.execute(dto);
      console.log('🚀 ~ file: create-subscription.use-case.ts:73 ~ CreateSubscriptionUseCase ~ execute ~ res 🚀 ➡➡', res);
      return subscription;
    } catch (error) {
      await this.subscriptionsRepository.delete(subscription._id);
      throw error;
    }
  }
}