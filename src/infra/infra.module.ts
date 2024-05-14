import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER, ENTITIES, JWT_EXPIRATION, JWT_SECRET } from '@/constants';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@/shared/guards';
import { PermissionsGuard } from '@/shared/guards/permission.guard';
import { UserController, AuthController, TenantController } from '@/presentation/controllers';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMongoModel } from './mongo/models';
import { repositoriesProviders } from './mongo/repository-providers';
import { UsersService } from '@/services/users.service';
import { AuthService } from 'services/auth.service';
import { useCasesProviders } from 'services/use-cases/use-cases.providers';
import { TenantMongoModel } from './mongo/models/tenant-mongo.model';
import { TenantsService } from 'services/tenants.service';
import { TenantsMiddleware } from 'shared/middlewares';

function getMongooseConnectionString() {
    const user = DB_USER ? `${DB_USER}:${DB_PASS}@` : '';
    return `mongodb://${user}${DB_HOST}:${DB_PORT}/${DB_NAME}`;
}


@Module({
    imports: [
        MongooseModule.forRoot(getMongooseConnectionString()),
        MongooseModule.forFeature([
            { name: ENTITIES.USER, schema: UserMongoModel },
            { name: ENTITIES.TENANT, schema: TenantMongoModel },
        ]),
        JwtModule.register({
            global: true,
            secret: JWT_SECRET,
            signOptions: { expiresIn: JWT_EXPIRATION }
        })
    ],
    providers: [
        ...repositoriesProviders,
        ...useCasesProviders,
        UsersService,
        AuthService,
        TenantsService,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: PermissionsGuard,
        },
        TenantsMiddleware
    ],
    controllers: [
        AuthController,
        UserController,
        TenantController
    ],
})
export class InfraModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(TenantsMiddleware).forRoutes('*');
    }
}
