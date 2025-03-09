// Определите интерфейс для данных пользователя
interface UserData {
    email: string;
    password: string;
    name?: string; // Например, поле "name" может быть необязательным
  }
  
  // Модификация AuthService с типизацией для userData
  import ApiService from './ApiService';
  import $api from '../http';
  
  export default class AuthService extends ApiService {
      // Указываем тип для параметра userData
      static register(userData: UserData) {
          return this.request(async () => await $api.post('auth/register', userData));
      }
  
      static login(userData: UserData) {
          return this.request(async () => await $api.post('auth/login', userData));
      }
  
      static logout() {
          return this.request(async () => await $api.post('auth/logout'));
      }
  }
  