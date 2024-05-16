import { Injectable } from '@nestjs/common';
import { CreateSubscriptionUseCase } from './use-cases';
import { CreateSubscriptionDTO } from 'core/dtos';

@Injectable()
export class SubscriptionsService {
  constructor(
    private readonly createSubscriptionUseCase: CreateSubscriptionUseCase,
  ) {}

  create(data: CreateSubscriptionDTO) {
    return this.createSubscriptionUseCase.execute(data);
  }
}
