import { AxiosError } from 'axios';
// import HandleApiError from "../Errors/ApiErrors"; // Подключаем кастомную ошибку

export default class ApiService {
    static async request(apiCall: () => Promise<any>) {
        try {
            const response = await apiCall();

            // Если ответ от API не ок, бросаем ошибку с текстом
            if (!response.ok) {
                const errorDetail = await response.json();
                throw new Error(errorDetail?.detail || 'Unknown error'); // Бросаем ошибку с описанием
            }

            // Если запрос успешен, возвращаем данные
            return response.data;
        } catch (error: any) {
            // Обработка ошибки с AxiosError
            if (error instanceof AxiosError) {
                if (error.response) {
                    // Бросаем ошибку с текстом из ответа сервера
                    const errorDetail = error.response.data?.detail || 'Unknown error';
                    throw new Error(errorDetail);
                } else {
                    // Ошибка, если нет ответа от сервера (например, сетевые ошибки)
                    throw new Error('Network error or no response from server');
                }
            }

            // Обработка любых других ошибок (не Axios)
            throw new Error('An unexpected error occurred');
        }
    }
}
