import React, { useEffect, useState } from 'react';
import { getTasks } from '../api';
import { useNavigate } from 'react-router-dom';

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    };
    fetchTasks();
  }, []);

  const voltarParaPrincipal = () => {
    navigate('/');
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date) ? 'Data inválida' : date.toLocaleDateString();
  };

  const getStatusClass = (status) => {
    if (status === 'pendente') return 'status-pendente';
    if (status === 'em andamento') return 'status-em-andamento';
    if (status === 'concluída') return 'status-concluida';
    return '';
  };

  return (
    <div className="task-container">
      <div style={{ marginBottom: '20px' }}>
        <button onClick={voltarParaPrincipal}>Voltar para a página principal</button>
      </div>
      <h2>Lista de Tarefas</h2>
      <table className="task-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Prazo</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.titulo}</td>
              <td>{formatDate(task.prazo)}</td>
              <td className={getStatusClass(task.status)}>{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskListPage;
