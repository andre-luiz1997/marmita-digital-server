import { Controller, Get } from '@nestjs/common';
import { ControllerResponse } from 'presentation/response';
import { TransactionsService } from 'services/transactions.service';
import { Pagination } from 'shared/decorators/pagination.decorator';
import { PaginationProps } from 'shared/types';

@Controller('/transactions')
export class TransactionController {
  constructor(
    private readonly service: TransactionsService
  ) { }

  @Get()
  async find(
    @Pagination() pagination: PaginationProps) {
    const { data, count } = await this.service.findAll(pagination);
    return ControllerResponse.build({
      data,
      count
    });
  }
}
