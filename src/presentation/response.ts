interface ControllerResponseProps {
  msg?: string;
  data?: any;
  count?: number;
}

export class ControllerResponse implements ControllerResponseProps {
  msg?: string;
  data?: any;
  count?: number;

  constructor(
    msg?: string,
    data?: any,
    count?: number
  ) {
    this.msg = msg;
    this.data = data;
    this.count = count;
  }

  static build(
    { msg, data, count }: ControllerResponseProps
  ) {
    return new ControllerResponse(msg, data);
  }
}