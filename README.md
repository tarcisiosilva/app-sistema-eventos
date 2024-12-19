# Application - Sistema de Gerenciamento de Eventos

Este projeto é um sistema de gerenciamento de eventos construído com **React.js**, oferecendo funcionalidades como visualização, edição e exclusão de eventos em um calendário interativo.

## Estrutura do Projeto
app-sistema-eventos/ 
├── node_modules/ 
├── public/ 
├── src/ 
│ ├── components/  
│ ├── CalendarView.css 
│ ├── CalendarView.js  
│ ├── EditModal.css  
│ ├── EditModal.js  
│ ├── EventForm.css 
│ ├── EventForm.js 
│ ├── EventList.js  
│ ├── Modal.css  
│ ├── Modal.js 
│ ├── pages/ 
│ │   ├── Home.js 
│ │   ├── Home.css 
├── App.css 
├── App.js  
├── App.test.js 
├── index.css 
├── index.js 
├── logo.svg  
├── .env 
├── .gitignore

### Descrição dos Arquivos Principais

- **components/**
  - `CalendarView.js` e `CalendarView.css`: Componente principal para exibição do calendário.
  - `EditModal.js` e `EditModal.css`: Modal para edição de eventos, com foco em UX/UI.
  - `EventForm.js` e `EventForm.css`: Formulário para criação de novos eventos.
  - `EventList.js`: Lista de eventos do dia.
  - `Modal.js` e `Modal.css`: Modal para exibir eventos e ações (editar/excluir).
  
- **pages/**: Diretório reservado para páginas completas da aplicação.
- **App.js**: Arquivo principal que orquestra os componentes e define a lógica geral.
- **index.js**: Ponto de entrada da aplicação.

## Instalação e Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/tarcisiosilva/app-sistema-eventos.git
   cd app-sistema-eventos

2. Instale as dependências:
  npm install

3. Criar .env

    REACT_APP_API_URL=http://localhost:8000/public
    REACT_APP_APP_NAME=Gerenciador de Eventos
    REACT_APP_ENV=development
    REACT_APP_VERSION=1.0.0

4. Inicie o servidor local:
   npm start
   
5. Acesse a aplicação em: http://localhost:3000.
