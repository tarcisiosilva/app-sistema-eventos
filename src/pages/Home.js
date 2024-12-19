import React, { useEffect, useState } from 'react';
import EventForm from '../components/EventForm';
import EventList from '../components/EventList';
import CalendarView from '../components/CalendarView';

import './Home.css'; // Arquivo CSS personalizado
import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;

const Home = () => {
    const [events, setEvents] = useState([]);
    const [showForm, setShowForm] = useState(false); // Estado para controlar a visibilidade do formulário
  

    const toggleForm = () => {
        setShowForm((prev) => !prev);
    };

    const fetchEvents = async () => {
        try {
            const response = await axios.get(apiUrl);
            setEvents(response.data);
        } catch (error) {
            console.error('Erro ao buscar eventos:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div>
            <h1>Gerenciamento de Eventos</h1>
            <button className="create-event-btn"  onClick={toggleForm}>
                {showForm ? 'Fechar Formulário' : 'Criar Novo Evento'}
            </button>
            {showForm && <EventForm refreshEvents={fetchEvents}  />}
            <CalendarView events={events} />
        </div>
    );
};

export default Home;
