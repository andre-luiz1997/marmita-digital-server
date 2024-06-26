import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER, ENTITIES, JWT_EXPIRATION, JWT_SECRET } from '@/constants';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@/shared/guards';
import { PermissionsGuard } from '@/shared/guards/permission.guard';
import { UserController, AuthController, TenantController, PlanController, SubscriptionController, CryptoController, PaymentController, ZipController, TransactionController } from '@/presentation/controllers';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMongoModel } from './mongo/models';
import { repositoriesProviders } from './mongo/repository-providers';
import { UsersService } from '@/services/users.service';
import { AuthService } from 'services/auth.service';
import { useCasesProviders } from 'services/use-cases/use-cases.providers';
import { TenantMongoModel } from './mongo/models/tenant-mongo.model';
import { TenantsService } from 'services/tenants.service';
import { TenantsMiddleware } from 'shared/middlewares';
import { PlanMongoModel } from './mongo/models/plan-mongo.model';
import { PlansService } from 'services/plans.service';
import { SubscriptionMongoModel } from './mongo/models/subscription-mongo.model';
import { SubscriptionsService } from 'services/subscriptions.service';
import { paymentsAdaptersProviders, zipcodeAdaptersProvider } from 'data/remote/adapters';
import { PaymentsService } from 'services/payments.service';
import { TransactionMongoModel } from './mongo/models/transaction-mongo.model';
import { TransactionsService } from 'services/transactions.service';

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
            { name: ENTITIES.PLAN, schema: PlanMongoModel },
            { name: ENTITIES.SUBSCRIPTION, schema: SubscriptionMongoModel },
            { name: ENTITIES.TRANSACTION, schema: TransactionMongoModel },
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
        ...paymentsAdaptersProviders,
        ...zipcodeAdaptersProvider,
        UsersService,
        AuthService,
        TenantsService,
        PlansService,
        SubscriptionsService,
        PaymentsService,
        TransactionsService,
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
        TenantController,
        PlanController,
        SubscriptionController,
        CryptoController,
        PaymentController,
        ZipController,
        TransactionController
    ],
    exports: [
        ...repositoriesProviders,
        ...useCasesProviders,
        UsersService,
        AuthService,
        TenantsService,
        PlansService,
        SubscriptionsService,
        TransactionsService
    ]
})
export class InfraModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(TenantsMiddleware).forRoutes('*');
    }
}
