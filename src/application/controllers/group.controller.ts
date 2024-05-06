import { REPOSITORIES } from '@/constants';
import { GroupService } from '@/domain/services/group.service';
import { Body, Controller, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { CreateGroupDTO } from '../dtos/groups/create-group.dto';
import { UpdateGroupDTO } from '../dtos/groups/update-group.dto';

@Controller('/groups')
export class GroupController {
  constructor(
    @Inject(REPOSITORIES.GROUP) private readonly groupService: GroupService
  ) { }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.groupService.findById(id);
  }

  @Get()
  find() {
    return this.groupService.find();
  }

  @Post()
  create(@Body() data: CreateGroupDTO) {
    return this.groupService.create(data);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateGroupDTO) {
    return this.groupService.update(id, data);
  }
}
