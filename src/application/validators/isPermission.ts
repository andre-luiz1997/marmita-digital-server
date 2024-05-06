import { PERMISSIONS } from '@/permissions';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'IsValidPermissions', async: false })
export class IsValidPermissions implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    for (const permission of value) {
      if (!Object.values(PERMISSIONS).includes(permission)) {
        return false;
      }
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Invalid permissions provided';
  }
}