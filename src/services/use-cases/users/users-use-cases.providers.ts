import { CreateUserUseCase } from "./create-user.use-case";
import { FindAllUsersUseCase } from "./find-all-users.use-case";
import { FindUserByIdUseCase } from "./find-user-by-id.use-case";
import { FindUserUseCase } from "./find-user.use-case";
import { UpdateUserUseCase } from "./update-user.use-case";

export const usersUseCasesProviders = [
  {
    provide: CreateUserUseCase,
    useClass: CreateUserUseCase
  },
  {
    provide: UpdateUserUseCase,
    useClass: UpdateUserUseCase
  },
  {
    provide: FindUserByIdUseCase,
    useClass: FindUserByIdUseCase
  },
  {
    provide: FindUserUseCase,
    useClass: FindUserUseCase
  },
  {
    provide: FindAllUsersUseCase,
    useClass: FindAllUsersUseCase
  },
]