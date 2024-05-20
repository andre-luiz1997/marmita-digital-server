import { Injectable } from "@nestjs/common";
import { UseCase } from "core/base";
import { CreateTransactionDTO } from "core/dtos";

@Injectable()
export class CreateTransactionUseCase implements UseCase<any> {
  execute(data: CreateTransactionDTO): Promise<any> {
    throw new Error("Method not implemented.");
  }
}