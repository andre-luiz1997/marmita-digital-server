import { HttpException, HttpStatus } from '@nestjs/common';

export class ConflictException extends HttpException {
  constructor(type: string, column: string, value: any) {
    if(type == 'user' && column == 'email' || column == 'mobile_phone') super('credentials_conflict', HttpStatus.CONFLICT);
    else super(`There is already a ${type} with ${column} ${value}`, HttpStatus.CONFLICT);
  }
}
