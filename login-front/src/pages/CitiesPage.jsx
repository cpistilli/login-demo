import React, {useMemo, useState} from "react";
import { useNavigate } from "react-router-dom";
import cities from "../datos/paraguayCities.json";
import './Page.css';

function normalizeText(text) {
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
}

export default function CitiesPage() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const filtered = useMemo(() => {
        return cities
            .filter(c => normalizeText(c.label).includes(normalizeText(query)))
            .sort((a, b) => a.label.localeCompare(b.label))
    }, [query]);

    return (
        <div className="page-container">
            <div className="form-wrapper" style= {{ width: 360 }}>
                <h2>Ciudades</h2>

                <input type="text" placeholder="Filtrar ciudades..." value={query} onChange={e => setQuery(e.target.value)}
                 style={{ marginBottom: 12, padding: 10, borderRadius: 8, border: '1 solid #eee', width: '93%' }} />
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxHeight: 420, overflow: 'auto' }}>
                    {filtered.map(({label, q})=> (
                        <li key={label} onClick={() => navigate(`/app/weather/${encodeURIComponent(label)}?q=${encodeURIComponent(q)}`)}
                            style={{ background: '#fff', color: '#002B5C' , marginBottom: 10, borderRadius: 10,
                                    padding: 12, cursor: 'pointer', border: '1px solid #eee'
                            }}
                        >
                            {label}
                        </li>
                    ))}
                </ul>
                <button
                    onClick={() => { localStorage.removeItem('loggedIn'); navigate('/', { replace: true }); }}
                    style={{ marginTop: 12, background: '#C8102E', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 12px' }}
                >
                    Cerrar Sesion
                </button>
            </div>
        </div>
    );
}