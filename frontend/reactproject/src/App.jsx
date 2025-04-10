import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import TaskForm from './componentes/TaskForm';
import TaskList from './componentes/TaskList';
import TaskDetail from './componentes/TaskDetail';
import TaskListPage from './componentes/TaskListPage';
import './App.css';

const App = () => {
  const [refresh, setRefresh] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const triggerUpdate = () => setRefresh(!refresh);
  const handleEditTask = (task) => setCurrentTask(task);

  return (
    <Router>
      <div>
        <h1>Gerenciador de Tarefas</h1>
        <MostrarBotaoSomenteNaHome />
        <Routes>
          <Route path="/" element={
            <>
              <TaskForm onTaskAdded={triggerUpdate} currentTask={currentTask} setCurrentTask={setCurrentTask} />
              <TaskList
                key={refresh}
                onTaskDeleted={triggerUpdate}
                onEditTask={handleEditTask}
              />
            </>
          } />
          <Route path="/detalhes/:id" element={<TaskDetail />} />
          <Route path="/somente-lista" element={<TaskListPage />} />
        </Routes>
      </div>
    </Router>
  );
};

// Componente que só mostra o botão na página principal
const MostrarBotaoSomenteNaHome = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname !== '/') return null;

  return (
    <div style={{ marginBottom: '20px' }}>
      <button onClick={() => navigate('/somente-lista')}>
        Ver Somente Lista de Tarefas
      </button>
    </div>
  );
};

export default App;
