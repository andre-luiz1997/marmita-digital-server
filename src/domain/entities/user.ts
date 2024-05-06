import { Group } from "./";

export class User {
  _id: any;
  group: Group;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}