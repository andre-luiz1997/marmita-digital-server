export class ControllerResponse {
  private msg?: string;
  private data?: any;

  constructor(
    msg?: string,
    data?: any
  ) {
    this.msg = msg;
    this.data = data;
  }

  static build(
    { msg, data }: { msg?: string; data?: any }
  ) {
    return new ControllerResponse(msg, data);
  }
}