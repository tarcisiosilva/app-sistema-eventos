import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const EventList = () => {
  const [eventos, setEventos] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    // Fazendo a chamada à API
    axios.get(apiUrl)
      .then((resposta) => {
        // Verificando se a resposta é um array e contém dados
        if (Array.isArray(resposta.data)) {
          setEventos(resposta.data); // Atualizando o estado com a lista de eventos
        } else {
          throw new Error("Formato de resposta inesperado."+resposta.data); // Lançando erro se a resposta não for o esperado
        }
      })
      .catch((erro) => {
        setErro(erro.message || "Erro desconhecido.");
        console.error("Erro ao carregar eventos:", erro);
      });
  }, []);

  if (erro) {
    return <div>Erro ao carregar eventos: {erro}</div>;
  }

  if (eventos.length === 0) {
    return <div>Carregando eventos...</div>;
  }

  return (
    <div>
      <h1>Lista de Eventos</h1>
      {eventos.map((evento) => (
        <div key={evento.id}>
          <h2>{evento.titulo}</h2>
          <p>{evento.descricao}</p>
          <p><strong>Data Início:</strong> {evento.data_inicio}</p>
          <p><strong>Data Fim:</strong> {evento.data_fim}</p>
        </div>
      ))}
    </div>
  );
};

export default EventList;
