import { HttpException, HttpStatus } from '@nestjs/common';

export class AdapterNotFoundException extends HttpException {
  constructor(provider: string) {
    super(`No adapter found for provider ${provider}`, HttpStatus.NOT_IMPLEMENTED);
  }
}
