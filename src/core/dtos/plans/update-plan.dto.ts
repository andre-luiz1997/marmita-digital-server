import { PartialType } from "@nestjs/swagger";
import { CreatePlanDTO } from "./create-plan.dto";

export class UpdatePlanDTO extends PartialType(CreatePlanDTO) {}