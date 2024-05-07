import { HttpException, HttpStatus } from '@nestjs/common';

export class RecordNotFoundException extends HttpException {
  constructor(type?: string, column?: string, value?: any) {
    super(type && column && value ? `No ${type} found with ${column} ${value}` : 'Record not found', HttpStatus.NOT_FOUND);
  }
}
