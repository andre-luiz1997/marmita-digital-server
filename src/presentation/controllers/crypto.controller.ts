
import { Controller, Get } from '@nestjs/common';
import { ControllerResponse } from 'presentation/response';
import { Crypto } from 'crypto/crypto';

@Controller('/crypto')
export class CryptoController {
  crypto = Crypto.getInstance();

  @Get('pk')
  async getEncryptionKey() {
    return ControllerResponse.build({
      data: this.crypto.getPUK()
    })
  }
}
