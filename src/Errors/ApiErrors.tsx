// import { AxiosError } from 'axios';

// interface ErrorResponse {
//   detail?: string;
// }

// const HandleApiError = (error: AxiosError<ErrorResponse>): string => {
//     if (error.response) {
//         // Type assertion: мы уверены, что error.response.data имеет тип ErrorResponse
//         return error.response.data.detail || "Произошла ошибка на сервере.";
//     } else if (error.request) {
//         return "Сервер не ответил. Попробуйте позже.";
//     } else {
//         return "Произошла ошибка. Попробуйте позже";
//     }
// };

// export default HandleApiError;
