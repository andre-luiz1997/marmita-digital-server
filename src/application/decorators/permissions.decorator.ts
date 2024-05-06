import { PERMISSIONS_KEY, Permission } from "@/permissions";
import { SetMetadata } from "@nestjs/common";

export const UsePermissions = (permissions: Permission[] = []) => SetMetadata(PERMISSIONS_KEY, permissions);