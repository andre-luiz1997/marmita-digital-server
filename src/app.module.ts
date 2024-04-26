import { UserController } from './application/controllers';
import { DatabaseModule } from './infra/database/database.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    UserController
  ],
  providers: [],
})
export class AppModule { }
