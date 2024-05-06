import { UserController } from '@/application/controllers';
import { AuthController } from '@/application/controllers/auth.controller';
import { Module } from '@nestjs/common';
import { MongoModule } from './mongo/mongo.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_EXPIRATION, JWT_SECRET } from '@/constants';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@/application/guards';

@Module({
    imports: [
        MongoModule,
        JwtModule.register({
            global: true,
            secret: JWT_SECRET,
            signOptions: { expiresIn: JWT_EXPIRATION }
        })
    ],
    controllers: [
        UserController,
        AuthController
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
})
export class InfraModule { }
