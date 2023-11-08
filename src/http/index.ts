import axios from 'axios';

const $api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true
});

$api.interceptors.request.use((config)=>{
    return config;
});

$api.interceptors.response.use((config)=>{
    return config;
}, async (error) => {
    const originalRequest = error.config;

    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            await axios.get('http://localhost:8080/users/auth', {withCredentials: true});

            return $api.request(originalRequest);
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН');
        }
    }

    throw error;
});

export default $api;