import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../api';
import { useNavigate } from 'react-router-dom';

const TaskList = ({ onTaskDeleted, onEditTask }) => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
      onTaskDeleted();
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  const handleEdit = (task) => {
    onEditTask(task);
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
      <h2>Lista de Tarefas</h2>
      <table className="task-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Prazo</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.titulo}</td>
              <td>{formatDate(task.prazo)}</td>
              <td className={getStatusClass(task.status)}>{task.status}</td>
              <td>
                <button onClick={() => handleEdit(task)}>Editar</button>
                <button onClick={() => handleDelete(task.id)}>Excluir</button>
                <button onClick={() => navigate(`/detalhes/${task.id}`)}>Mais Detalhes</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
