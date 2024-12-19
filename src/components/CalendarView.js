import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import Modal from './Modal'; // Importando o Modal
import 'react-calendar/dist/Calendar.css';
import './CalendarView.css'; // Arquivo CSS personalizado

const apiUrl = process.env.REACT_APP_API_URL;

const CalendarView = () => {
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvents, setSelectedEvents] = useState([]);

    useEffect(() => {
        // Chama o endpoint para obter eventos
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => setEvents(data))
            .catch((error) => console.error('Erro ao carregar eventos:', error));
    }, []);

    const openModal = (date) => {
        const eventsForDate = events.filter((event) => {
            // Converta a string do back-end em objeto Date
            const eventDate = new Date(event.data_inicio).setHours(0, 0, 0, 0); // Normaliza a data do evento
            const calendarDate = new Date(date).setHours(0, 0, 0, 0); // Normaliza a data do calendário
            return eventDate === calendarDate;
        });

        setSelectedEvents(eventsForDate);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEvents([]);
    };

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const dayEvents = events.filter((event) => {
                const eventDate = new Date(event.data_inicio).setHours(0, 0, 0, 0); // Normaliza a data do evento
                const calendarDate = new Date(date).setHours(0, 0, 0, 0); // Normaliza a data do calendário
                return eventDate === calendarDate;
            });

            return dayEvents.length > 0 ? <span>📅</span> : null;
        }
    };

    return (
        <div>
            <h2>Calendário</h2>
            <Calendar
                tileContent={tileContent}
                onClickDay={openModal}
            />

            {/* Modal com eventos */}
            <Modal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                events={selectedEvents} 
            />
        </div>
    );
};

export default CalendarView;
