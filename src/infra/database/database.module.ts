import { Module } from '@nestjs/common';
import { MongoModule } from '../mongo/mongo.module';
import { UserController } from '@/application/controllers';

@Module({
    imports: [MongoModule],
    controllers: [UserController],
    exports: [
        MongoModule, 
    ],
})
export class DatabaseModule { }
