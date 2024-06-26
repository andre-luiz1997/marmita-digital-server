import { UserMongoRepository } from "@/data/remote/mongo/user-mongo.repository";
import { UserRepository } from "@/core/repositories/user.repository";
import { PlanRepository, SubscriptionRepository, TenantRepository, TransactionRepository } from "core/repositories";
import { TenantMongoRepository } from "data/remote/mongo/tenant-mongo.repository";
import { PlanMongoRepository } from "data/remote/mongo/plan-mongo.repository";
import { SubscriptionMongoRepository } from "data/remote/mongo/subscription-mongo.repository";
import { TransactionMongoRepository } from "data/remote/mongo/transaction-mongo.repository";

export const repositoriesProviders = [
  {
    provide: UserRepository,
    useClass: UserMongoRepository
  },
  {
    provide: TenantRepository,
    useClass: TenantMongoRepository
  },
  {
    provide: PlanRepository,
    useClass: PlanMongoRepository
  },
  {
    provide: SubscriptionRepository,
    useClass: SubscriptionMongoRepository
  },
  {
    provide: TransactionRepository,
    useClass: TransactionMongoRepository
  },
]