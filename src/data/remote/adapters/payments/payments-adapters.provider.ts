import { PagarmeAdapter } from "./pagarme.adapter";

export const paymentsAdaptersProviders = [
  {
    provide: PagarmeAdapter,
    useClass: PagarmeAdapter
  }
]