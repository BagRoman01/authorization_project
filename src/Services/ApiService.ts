import HandleApiError from "../Errors/ApiErrors";
import { AxiosError } from 'axios'; 

export default class ApiService {
    static async request(apiCall: () => Promise<any>) {
        try {
            const response = await apiCall();
            return response.data;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                throw HandleApiError(error);
            } else {
                console.error("An unexpected error occurred:", error);
                throw new Error("An unexpected error occurred");
            }
        }
    }
}
