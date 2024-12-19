import React from 'react';
import ReactDOM from 'react-dom/client'; // Alteração aqui
import App from './App';
import './index.css';

// Criação do root usando createRoot
const root = ReactDOM.createRoot(document.getElementById('root')); // Alteração aqui
root.render(<App />); // Alteração aqui
