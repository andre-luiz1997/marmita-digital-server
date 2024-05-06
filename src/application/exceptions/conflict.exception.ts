import { HttpException, HttpStatus } from '@nestjs/common';

export class ConflictException extends HttpException {
  constructor(type: string, column: string, value: any) {
    super(`There is already a ${type} with ${column} ${value}`, HttpStatus.CONFLICT);
  }
}
