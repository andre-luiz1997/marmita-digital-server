import { CreateGroupUseCase } from "./create-group.use-case";
import { DeleteGroupUseCase } from "./delete-group.use-case";
import { FindAllGroupsUseCase } from "./find-all-groups.use-case";
import { FindGroupByIdUseCase } from "./find-group-by-id.use-case";
import { GetDefaultGroupUseCase } from "./get-default-group.use-case";
import { UpdateGroupUseCase } from "./update-group.use-case";

export const groupsUseCasesProviders = [
  {
    provide: CreateGroupUseCase,
    useClass: CreateGroupUseCase
  },
  {
    provide: UpdateGroupUseCase,
    useClass: UpdateGroupUseCase
  },
  {
    provide: DeleteGroupUseCase,
    useClass: DeleteGroupUseCase
  },
  {
    provide: FindGroupByIdUseCase,
    useClass: FindGroupByIdUseCase
  },
  {
    provide: FindAllGroupsUseCase,
    useClass: FindAllGroupsUseCase
  },
  {
    provide: GetDefaultGroupUseCase,
    useClass: GetDefaultGroupUseCase
  },
]