import { Injectable } from "@nestjs/common";
import axios from "axios";
import { Address } from "core/domain/entities";
import { ZipcodeProvider } from "core/providers";

@Injectable()
export class BrasilAPIAdapter implements ZipcodeProvider {
  private endpoint = 'https://brasilapi.com.br/api/cep/v2';

  async fetchAddress(zipcode: string): Promise<Address> {
    const res = await axios.get(`${this.endpoint}/${zipcode}`);
    return {
      zipcode,
      city: res.data.city,
      state: res.data.state,
      neighborhood: res.data.neighborhood,
      street: res.data.street,
      country: 'BR'
    } 
  }

}