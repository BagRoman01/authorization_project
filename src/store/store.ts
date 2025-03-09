import {makeAutoObservable} from "mobx"
import AuthService from "../Services/AuthService";
import axios from "axios";
import { API_URL } from "../http";

interface UserData {
    email: string;
    password: string;
    age: number | null;
   // name?: string; // Например, поле "name" может быть необязательным
  }
  

export default class Store{
    user = {} 
    isAuth: boolean = false;
    isLoading : boolean = false; 

    constructor() {
        makeAutoObservable(this)
    } 
    setAuth(bool: boolean){this.isAuth = bool;}
    setUser(user : UserData){this.user = user;}
    setIsLoading(loading: boolean){this.isLoading = loading;} 

    // Типизация параметра action как функции, которая возвращает Promise
    async executeRequest(action: () => Promise<void>) {
    try {
        await action();
    } catch (error) {
        console.error("Произошла ошибка:", error); 
        throw error; 
    }
    }
    
    async login(userData: UserData) {
        await this.executeRequest(async () => {
            console.log(userData)
            const response = await AuthService.login(userData);
            console.log("ResponseAccessToken:", response.access_token); 
            localStorage.setItem('access_token', response.access_token);
            this.setAuth(true);
        });
    }
    
    async logout() {
        await this.executeRequest(async () => {
            await AuthService.logout();
            localStorage.removeItem('access_token');
            this.setAuth(false);
            this.setUser({ email: '', password: '', age: null});
        });
    }

    async checkAuth() {
        this.setIsLoading(true);
    
        try {
            const response = await axios.get(`${API_URL}/auth/refresh`, { withCredentials: true });
            localStorage.setItem('access_token', response.data.access_token);
            this.setAuth(true);
        } catch (e) {
            if (axios.isAxiosError(e)) {
                // It's an Axios error
                console.log(e.response?.data?.message); // Handle AxiosError specifically
            } else {
                // Handle other types of errors (network errors, etc.)
                console.log('An unexpected error occurred');
            }
        } finally {
            this.setIsLoading(false);
        }
    }
}