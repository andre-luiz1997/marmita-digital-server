import { CreatePlanUseCase } from "./create-plan.use-case";
import { DeletePlanUseCase } from "./delete-plan.use-case";
import { FindAllPlansUseCase } from "./find-all-plans.use-case";
import { FindPlanByIdUseCase } from "./find-plan-by-id.use-case";
import { FindPlanUseCase } from "./find-plan.use-case";
import { UpdatePlanUseCase } from "./update-plan.use-case";

export const planUseCasesProviders = [
  {
    provide: CreatePlanUseCase,
    useClass: CreatePlanUseCase
  },
  {
    provide: FindPlanByIdUseCase,
    useClass: FindPlanByIdUseCase
  },
  {
    provide: FindPlanUseCase,
    useClass: FindPlanUseCase
  },
  {
    provide: FindAllPlansUseCase,
    useClass: FindAllPlansUseCase
  },
  {
    provide: UpdatePlanUseCase,
    useClass: UpdatePlanUseCase
  },
  {
    provide: DeletePlanUseCase,
    useClass: DeletePlanUseCase
  }
]