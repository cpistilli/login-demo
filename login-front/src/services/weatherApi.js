import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_API_BASE || 'http://localhost:8080/',
});

export async function fetchWeather(city, units = 'metric') {
    const { data } = await API.get('/api/weather', { params: { city, units } });

    if (data && typeof data === 'object' && 'body' in data && typeof data.body === 'string') {
        return JSON.parse(data.body);
    }
    if (typeof data === 'string') {
        try { return JSON.parse(data); } catch {  }
    }
    return data;
}