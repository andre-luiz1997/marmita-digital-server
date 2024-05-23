import { Injectable } from '@nestjs/common';
import { PaginationProps } from 'shared/types';
import { FindAllTransactionsUseCase } from './use-cases';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly findAllTransactionsUseCase: FindAllTransactionsUseCase
  ) {}

  async findAll(pagination?: PaginationProps) {
    return this.findAllTransactionsUseCase.execute(pagination);
  }
}
