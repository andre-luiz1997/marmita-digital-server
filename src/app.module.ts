import { DatabaseModule } from './infra/database/database.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [

  ],
  providers: [],
})
export class AppModule { }
