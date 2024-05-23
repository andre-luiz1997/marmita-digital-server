import { Mapper } from "core/base";
import { CardPayment, PlanEntity, SubscriptionEntity, SubscriptionPayment, TenantEntity, TransactionEntity } from "core/domain/entities";
import { PagarmeTransaction, PagarmeTransactionResponse, getTransactionStatus } from "../types";
import { PAYMENT_METHODS, TRANSACTION_GATEWAYS } from "@/constants";

interface PagarmeTransactionMapperInput {
  pagarmeResponse: PagarmeTransactionResponse;
  plan: PlanEntity;
  tenant: TenantEntity;
  subscription: SubscriptionEntity;
  payment: SubscriptionPayment;
}

export class PagarmeTransactionMapper implements Mapper<TransactionEntity, PagarmeTransactionMapperInput> {
  mapFrom(param: TransactionEntity): PagarmeTransactionMapperInput {
    throw new Error("Method not implemented.");
  }
  mapTo(param: PagarmeTransactionMapperInput): TransactionEntity {
    const transaction = new TransactionEntity();
    transaction.amount = param.pagarmeResponse.amount;
    transaction.gateway = TRANSACTION_GATEWAYS.PAGARME;
    transaction.status = getTransactionStatus(TRANSACTION_GATEWAYS.PAGARME, param.pagarmeResponse.status);
    transaction.gatewayId = param.pagarmeResponse.id.toString();
    transaction.createdAt = new Date(param.pagarmeResponse.date_created);
    transaction.updatedAt = new Date(param.pagarmeResponse.date_updated);
    transaction.plan = param.plan;
    transaction.tenant = param.tenant;
    transaction.subscription = param.subscription;
    // @ts-ignore
    const payment: SubscriptionPayment = {
      method: param.payment.method,
      currency: param.plan.pricing.currency
    }
    if (param.payment.method == PAYMENT_METHODS.CARD) {
      (payment as CardPayment).creditCard = {
        number: param.pagarmeResponse.card_first_digits,
        name: param.pagarmeResponse.card_holder_name,
      }
    }
    transaction.payment = payment;
    return transaction;
  }
}