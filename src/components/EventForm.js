import React, { useState } from 'react';
import axios from 'axios';
import './EventForm.css'; // Arquivo CSS personalizado


const refreshEvents = () => { 
    window.location.reload(); 
}
    
    const EventForm = () => {
        const [formData, setFormData] = useState({
            title: '',
            description: '',
            startDate: '',
            endDate: ''
        });
    
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({
                ...formData,
                [name]: value
            });
        };
    
        const handleSubmit = (e) => {
            e.preventDefault();
            console.log(formData);
            axios.post('http://localhost:8000/public', formData)
                .then((response) => {
                    console.log('Evento criado:', response.data);
                    refreshEvents();
                })
                .catch((error) => {
                    console.error('Erro ao criar evento:', error.response ? error.response.data : error.message);
                });
        };
        return (
            <form onSubmit={handleSubmit} className="event-form">
                <h2>Criar Evento</h2>
                <div className="form-field">
                    <label htmlFor="title">Título</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Título"
                        required
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="description">Descrição</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Descrição"
                        required
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="startDate">Data de Início</label>
                    <input
                        type="datetime-local"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="endDate">Data de Término</label>
                    <input
                        type="datetime-local"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Criar Evento</button>
            </form>
        );
    };
    
    export default EventForm;
    