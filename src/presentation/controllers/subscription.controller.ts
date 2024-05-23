import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { SubscriptionEntity } from 'core/domain/entities';
import { CreateSubscriptionDTO } from 'core/dtos';
import { ControllerResponse } from 'presentation/response';
import { SubscriptionsService } from 'services/subscriptions.service';
import { RecordNotFoundException } from 'shared/exceptions';
import { CustomRequest } from 'shared/types';

@Controller('/subscriptions')
export class SubscriptionController {
  constructor(
    private readonly subscriptionsService: SubscriptionsService
  ) { }

  @Get('tenant/:tenantId')
  async findTenantSubscription(@Param('tenantId') tenantId: string) {
    const subscription = await this.subscriptionsService.findOne({
      tenant: {
        _id: tenantId
      }
    })
    if(!subscription) throw new RecordNotFoundException('subscription', 'tenant', tenantId);
    return ControllerResponse.build({
      data: subscription 
    });
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return ControllerResponse.build({
      data: await this.subscriptionsService.findOneById(id)
    });
  }

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
