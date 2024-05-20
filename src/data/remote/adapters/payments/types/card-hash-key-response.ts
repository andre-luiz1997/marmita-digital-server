export interface PagarmeCardHashKeyResponse {
  date_created: string;
  id: number;
  ip: string;
  /**
   * @example "-----BEGIN PUBLIC KEY----- ... -----END PUBLIC KEY-----\n"
   */
  public_key: string;
}