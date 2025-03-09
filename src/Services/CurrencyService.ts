import ApiService from "./ApiService";
import $api from "../http";

export default class CurrencyService extends ApiService {
  static async fetchCurrencies() {
    return await this.request(async() => await $api.get('currency/all'));
  }
}