import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditModal.css'; 

const apiUrl = process.env.REACT_APP_API_URL;

const refreshEvents = () => { 
    window.location.reload(); 
}

const EditModal = ({ isOpen, onClose, event }) => {
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        description: '',
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        if (event) {
            setFormData({
                id: event.id,
                title: event.titulo,
                description: event.descricao,
                startDate: event.data_inicio,
                endDate: event.data_fim
            });
        }
    }, [event]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put({apiUrl}, formData)
            .then((response) => {
                console.log('Evento Atualizado:', response.data);
                refreshEvents();
                onClose(); // Fecha o modal após salvar
            })
        } catch (error) {
            console.error('Erro ao atualizar evento:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Editar Evento</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="hidden"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Título"
                        required
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Descrição"
                        required
                    ></textarea>
                    <input
                        type="datetime-local"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="datetime-local"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                    />
                    <div className="modal-actions">
                        <button type="submit">Salvar</button>
                        <button type="button" onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;
