import { Module } from '@nestjs/common';
import { MongoModule } from '../mongo/mongo.module';
import { UserService } from '@/domain/services/user.service';

@Module({
    imports: [MongoModule],
    exports: [
        MongoModule, 
        UserService
    ],
    providers: [
        UserService
    ],
})
export class DatabaseModule { }
