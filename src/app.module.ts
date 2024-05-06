import { GroupController } from './application/controllers/group.controller';
import { GroupService } from './domain/services/group.service';
import { InfraModule } from './infra/infra.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    InfraModule
  ],
  controllers: [
    
  ],
  providers: [],
})
export class AppModule { }
