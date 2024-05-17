import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateSubscriptionDTO } from 'core/dtos';
import { ControllerResponse } from 'presentation/response';
import { SubscriptionsService } from 'services/subscriptions.service';
import { CustomRequest } from 'shared/types';

@Controller('/subscriptions')
export class SubscriptionController {
  constructor(
    private readonly subscriptionsService: SubscriptionsService
  ) { }

  @Post()
  async create(
    @Req() req: CustomRequest,
    @Body() data: CreateSubscriptionDTO
  ) {
    if (req.tenant) {
      data.tenant = req.tenant;
    }
    return ControllerResponse.build({
      data: await this.subscriptionsService.create(data)
    });
  }
}
