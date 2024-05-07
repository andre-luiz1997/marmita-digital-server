import { Repository } from "../base";
import { GroupEntity } from "../domain/entities";

export abstract class GroupRepository extends Repository<GroupEntity> {}