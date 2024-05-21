import { Mapper } from "core/base";
import { CreateTransactionDTO } from "core/dtos";
import { PagarmeItem, PagarmeTransaction } from "../types";
import { PAYMENT_METHODS } from "@/constants";
import { ValidationException } from "shared/exceptions";
import { filterUndefinedOrNull } from "shared/utils/common";

export class CreatePagarmeTransactionMapper implements Mapper<CreateTransactionDTO, PagarmeTransaction> {
  mapFrom(param: CreateTransactionDTO): PagarmeTransaction {
    if (param.payment.method == PAYMENT_METHODS.CARD) {
      if (!param.tenant) throw new ValidationException('Tenant is required');
      if (!param.billing) throw new ValidationException('Billing is required');
      const billing = param.billing;
      let expiration = param.payment.creditCard.expiration;
      if (expiration.includes('-')) {
        let [year, month] = expiration.split('-');
        year = year.length == 2 ? year : year.at(-2);
        expiration = [year, month].join('');
      }
      const items: PagarmeItem[] = [
        {
          id: param.plan._id.toString(),
          title: param.plan.name,
          unit_price: param.amount,
          quantity: 1,
          tangible: false
        }
      ]

      return filterUndefinedOrNull({
        amount: param.amount,
        payment_method: 'credit_card',
        card_cvv: param.payment.creditCard.cvv,
        card_expiration_date: expiration,
        card_holder_name: param.payment.creditCard.name,
        card_number: param.payment.creditCard.number,
        card_hash: param.payment.creditCard.hash,
        items,
        customer: {
          email: billing.email,
          name: billing.name,
          country: billing.address.country.toLowerCase(),
          documents: billing.documents,
          phone_numbers: billing.phones,
          birthday: billing.birthday,
          type: billing.type,
          external_id: param.tenant._id.toString()
        },
        billing: {
          name: billing.name,
          address: {
            country: billing.address?.country.toLowerCase(),
            state: billing.address?.state,
            city: billing.address?.city,
            neighborhood: billing.address?.neighborhood,
            street: billing.address?.street,
            street_number: billing.address?.street_number,
            zipcode: billing.address?.zipcode
          }
        }
      })
    }
    return null;
  }
  mapTo(param: PagarmeTransaction): CreateTransactionDTO {
    throw new Error("Method not implemented.");
  }

}