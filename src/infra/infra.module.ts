import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER, ENTITIES, JWT_EXPIRATION, JWT_SECRET } from '@/constants';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@/shared/guards';
import { PermissionsGuard } from '@/shared/guards/permission.guard';
import { UserController, AuthController } from '@/presentation/controllers';
import { GroupController } from '@/presentation/controllers/group.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupMongoModel, UserMongoModel } from './mongo/models';
import { GroupEntity, UserEntity } from '@/core/domain/entities';
import { repositoriesProviders } from './mongo/repository-providers';
import { UsersService } from '@/services/users.service';
import { GroupsService } from '@/services/group.service';
import { AuthService } from 'services/auth.service';
import { useCasesProviders } from 'services/use-cases/use-cases.providers';

function getMongooseConnectionString() {
    const user = DB_USER ? `${DB_USER}:${DB_PASS}@` : '';
    return `mongodb://${user}${DB_HOST}:${DB_PORT}/${DB_NAME}`;
}


@Module({
    imports: [
        MongooseModule.forRoot(getMongooseConnectionString()),
        MongooseModule.forFeature([
            { name: ENTITIES.GROUP, schema: GroupMongoModel },
            { name: ENTITIES.USER, schema: UserMongoModel },
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
        GroupsService,
        AuthService,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: PermissionsGuard,
        },
    ],
    controllers: [
        AuthController,
        GroupController,
        UserController
    ],
})
export class InfraModule { }
