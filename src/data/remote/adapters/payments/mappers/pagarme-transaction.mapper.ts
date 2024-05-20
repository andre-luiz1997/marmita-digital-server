import { Mapper } from "core/base";
import { TransactionEntity } from "core/domain/entities";
import { PagarmeTransaction } from "../types";

export class PagarmeTransactionMapper implements Mapper<TransactionEntity, PagarmeTransaction> {
  mapFrom(param: TransactionEntity): PagarmeTransaction {
    throw new Error("Method not implemented.");
  }
  mapTo(param: PagarmeTransaction): TransactionEntity {
    throw new Error("Method not implemented.");
  }
}