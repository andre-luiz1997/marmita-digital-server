import { Injectable } from "@nestjs/common";
import { UseCase } from "core/base";
import { TransactionEntity } from "core/domain/entities";
import { TransactionRepository } from "core/repositories";
import { PaginationProps } from "shared/types";

@Injectable()
export class FindAllTransactionsUseCase implements UseCase<{data: TransactionEntity[], count: number}> {
  constructor(
    private readonly repository: TransactionRepository,
  ) {}

  async execute(props?: PaginationProps): Promise<{data: TransactionEntity[], count: number}> {
    return this.repository.findAll(props);
  }
}