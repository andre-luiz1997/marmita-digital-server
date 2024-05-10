import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateGroupDTO } from '../../core/dtos/groups/create-group.dto';
import { GroupsService } from '@/services/group.service';
import { UpdateGroupDTO } from '@/core/dtos';
import { PublicRoute } from 'shared/decorators';

@Controller('/groups')
export class GroupController {
  constructor(
    private readonly groupService: GroupsService
  ) { }

  @Get('/:id')
  findOneById(@Param('id') id: string) {
    return this.groupService.findOneById(id);
  }

  @Get()
  find() {
    return this.groupService.find();
  }

  @Post()
  @PublicRoute()
  create(@Body() data: CreateGroupDTO) {
    console.log('🚀 ~ file: group.controller.ts:26 ~ GroupController ~ create ~ data 🚀 ➡➡', data);
    return this.groupService.create(data);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateGroupDTO) {
    return this.groupService.update(id, data);
  }
}
