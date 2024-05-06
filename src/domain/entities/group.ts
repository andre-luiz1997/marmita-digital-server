import { Permission } from "@/permissions";

export class Group {
  _id: any;
  name: string;
  permissions: Permission[];
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}