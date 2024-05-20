import { Controller, Get, Param } from '@nestjs/common';
import { ControllerResponse } from 'presentation/response';
import { FetchZipcodeUseCase } from 'services/use-cases';

@Controller('/zip')
export class ZipController {
  constructor(
    private fetchZipcodeUseCase: FetchZipcodeUseCase,
  ) {}

  @Get("/:zipcode")
  async getZipCode(
    @Param('zipcode') zipcode: string,
  ) {
    return ControllerResponse.build({
      data: await this.fetchZipcodeUseCase.execute(zipcode),
    });
  }
}
