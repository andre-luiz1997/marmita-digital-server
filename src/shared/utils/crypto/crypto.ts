import { KeyObject, constants, generateKeyPairSync, privateDecrypt, privateEncrypt, publicEncrypt } from 'node:crypto';
import * as fs from 'node:fs';

export class Crypto {
  private static instance: Crypto;
  static PUK: string;
  static PVK: string;
  private pkCypher = process.env.CRYPTO_SECRET || 'secret';

  private constructor() {
    this.loadKeyPair();
  }
  static getInstance() {
    if (!Crypto.instance) {
      Crypto.instance = new Crypto();
    }
    return Crypto.instance;
  }

  public getPUK() {
    return Crypto.PUK;
  }

  public generateKeyPairSync() {
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
      modulusLength: 2048,
    });
    this.exportPUK(publicKey);
    this.exportPVK(privateKey);
    this.loadKeyPair();
  }

  public privateDecrypt(data: string) {
    return privateDecrypt(
      {
        key: Crypto.PVK,
        padding: constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
        passphrase: this.pkCypher,
      },
      Buffer.from(data, 'base64'),
    ).toString('utf-8');
  }

  public publicEncrypt(data: string, publicKey: string) {
    return publicEncrypt({
      key: publicKey,
      padding: constants.RSA_PKCS1_OAEP_PADDING,
    }, Buffer.from(data)).toString('base64');
  }

  private loadKeyPair() {
    Crypto.PUK = fs.readFileSync(`${process.env.BASE_PATH}/shared/utils/crypto/public.pem`, { encoding: 'utf8' });
    Crypto.PVK = fs.readFileSync(`${process.env.BASE_PATH}/shared/utils/crypto/private.pem`, { encoding: 'utf8' });
  }

  private exportPUK(publicKey: KeyObject) {
    const exportedPKBuffer = publicKey.export({ type: 'spki', format: 'pem' });
    fs.writeFileSync(`${process.env.BASE_PATH}/shared/utils/crypto/public.pem`, exportedPKBuffer, { encoding: 'utf8' });
  }

  private exportPVK(privateKey: KeyObject) {
    const exportedPVKBuffer = privateKey.export({
      type: 'pkcs1',
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase: this.pkCypher,
    });
    fs.writeFileSync(`${process.env.BASE_PATH}/shared/utils/crypto/private.pem`, exportedPVKBuffer, { encoding: 'utf8' });
  }
}