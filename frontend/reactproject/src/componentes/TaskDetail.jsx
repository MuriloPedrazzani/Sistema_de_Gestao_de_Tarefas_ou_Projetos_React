import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTaskById } from '../api';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await getTaskById(id);
        setTask(data);
      } catch (error) {
        console.error('Erro ao buscar detalhes da tarefa:', error);
      }
    };

    fetchTask();
  }, [id]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date) ? 'Data inválida' : date.toLocaleDateString();
  };

  const handleVoltar = () => {
    navigate('/');
  };

  if (!task) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h2>Detalhes da Tarefa</h2>
      <p><strong>Título:</strong> {task.titulo}</p>
      <p><strong>Descrição:</strong> {task.descricao}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Prazo:</strong> {formatDate(task.prazo)}</p>
      <button onClick={handleVoltar}>Voltar</button>
    </div>
  );
};

export default TaskDetail;
