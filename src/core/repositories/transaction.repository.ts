import { Repository } from "core/base";
import { TransactionEntity } from "core/domain/entities";

export abstract class TransactionRepository extends Repository<TransactionEntity>{}