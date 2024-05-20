import { ZipcodeProvider } from "core/providers";
import { BrasilAPIAdapter } from "./brasilapi.adapter";

export const zipcodeAdaptersProvider = [
  {
    provide: ZipcodeProvider,
    useClass: BrasilAPIAdapter
  }
]