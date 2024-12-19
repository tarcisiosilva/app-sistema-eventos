import React, { useState } from 'react';
import axios from 'axios';
import { BsFillTrash3Fill, BsFillPencilFill } from "react-icons/bs";
import EditModal from '../components/EditModal';

import './Modal.css'; // Arquivo CSS para o estilo do modal
import './EditModal.css'; 

const refreshEvents = () => { 
    window.location.reload(); 
}

const deleteEvent = async (id) => {
    try {
        const response = await axios.delete('http://localhost:8000/public', {
            data: { id }, // Envia o ID no corpo da requisição
        });

        if (response.status === 200) {
            console.log('Evento deletado com sucesso:', response.data);
            alert('Evento deletado com sucesso!');
            refreshEvents(); // Atualiza a lista de eventos após exclusão
        } else {
            console.error('Resposta inesperada do servidor:', response.status, response.data);
            alert('Erro inesperado ao deletar o evento.');
        }
    } catch (error) {
        console.error('Erro ao deletar evento:', error.response ? error.response.data : error.message);
        alert('Erro ao excluir o evento. Por favor, tente novamente.');
    }
};

const Modal = ({ isOpen, onClose, events, fetchEvents }) => {
    const [editEvent, setEditEvent] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const closeEditModal = () => {
        setEditEvent(null);
        setIsEditModalOpen(false);
    };

    const handleEdit = (event) => {
        console.log('Editar evento:', event);
        setEditEvent(event); // Define o evento a ser editado
        setIsEditModalOpen(true); // Abre o modal de edição
    };
    
    if (!isOpen) return null; // Se o modal não estiver aberto, não renderiza nada

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Eventos do Dia</h2>
                {events.length > 0 ? (
                    <ul>
                        {events.map((event) => (
                            <li key={event.id}>
                                {event.titulo} | 
                                <button onClick={() => handleEdit(event)}>
                                    <BsFillPencilFill />
                                </button> | 
                                <button onClick={() => deleteEvent(event.id)}>
                                    <BsFillTrash3Fill />
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhum evento neste dia.</p>
                )}
            </div>

            {/* Componente EditModal */}
            {isEditModalOpen && (
                <EditModal
                    isOpen={isEditModalOpen}
                    onClose={closeEditModal}
                    event={editEvent}
                    refreshEvents={fetchEvents}
                />
            )}
        </div>
    );
};

export default Modal;
