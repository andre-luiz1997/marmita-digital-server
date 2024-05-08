import { groupsUseCasesProviders } from "./groups";
import { usersUseCasesProviders } from "./users";

export const useCasesProviders = [
  ...usersUseCasesProviders,
  ...groupsUseCasesProviders
]