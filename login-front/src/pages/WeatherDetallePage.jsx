import React, { useEffect, useState } from "react";
import {useParams, useLocation, Link} from "react-router-dom";
import {fetchWeather } from "../services/weatherApi";
import './Page.css'

const UNIT_LABEL = { standard: 'K', metric: '°C', imperial: '°F' };

const CITY_Q = {
    'Asuncion': 'Asuncion,PY',
    'Ciudad del Este': 'Ciudad del Este,PY',
    'Encarnacion': 'Encarnacion,PY',
    'Loma Plata': 'Loma Plata,PY',
    'Villarrica': 'Villarrica,PY',
};

function useQuery() {
    const { search } = useLocation();
    return new URLSearchParams(search);
}

export default function WeatherDetallePage() {
    const { city } = useParams();
    const query = useQuery();

    const [units, setUnits] = useState('metric');
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const cityDecoded = decodeURIComponent(city);
    const qParam = query.get('q');
    const queryCity = qParam || CITY_Q[cityDecoded] || cityDecoded;

    useEffect(() => {
        (async () => {
            setLoading(true);
            setError('');
            setData(null);
            try {
                const json = await fetchWeather(queryCity, units);
                console.log("Respuesta backend:", json);
                console.log("queryCity:", queryCity);
                console.log("units:", units);
                console.log("data completa:", data);
                setData(json);
            } catch (e) {
                setError('No se pudo obtener el clima. Vuelve a intentarlo.');
            } finally {
                setLoading(false);
            }
        })();
    }, [queryCity, units]);

    const main = data?.main;
    const unit = UNIT_LABEL[units];

    return (
        <div className="page-container">
            <div className="form-wrapper" style={{ width: 360 }}>
                <h2>Clima en {cityDecoded}</h2>

                <div style={{ marginBottom: 12, background: '#fff', borderRadius: '10', padding: '10' }}>
                    <label style={{ marginRight: 8 }}>Unidades:</label>
                    <select value={units} onChange={(e) => setUnits(e.target.value)}>
                        <option value="standard">Kelvin (K)</option>
                        <option value="metric">Celsius (°C)</option>
                        <option value="imperial">Fahrenheit (°F)</option>
                    </select>
                </div>
                {loading && <p style={{ color: '#002B5C' }}>Cargando...</p>}
                {error && <p style={{ color: '#C8102E' }}>{error}</p>}

                {main && !loading && !error && (
                    <div className="weather-data">
                        <p><strong>Temperatura:</strong> {main.temp} {unit}</p>
                        <p><strong>Sensación Térmica:</strong> {main.feels_like} {unit}</p>
                        <p><strong>Mínima:</strong> {main.temp_min} {unit}</p>
                        <p><strong>Máxima:</strong> {main.temp_max} {unit}</p>
                    </div>
                )}

                <Link to="/app/cities">
                    Volver a Ciudades
                </Link>
            </div>
        </div>
    );
}