import React, { useState, useEffect } from 'react';
import { addTask, updateTask } from '../api';

const TaskForm = ({ currentTask, setCurrentTask, onTaskAdded }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    prazo: '',
    status: 'pendente'
  });

  useEffect(() => {
    if (currentTask) {
      setFormData({
        titulo: currentTask.titulo || '',
        descricao: currentTask.descricao || '',
        prazo: formatDate(currentTask.prazo),
        status: currentTask.status || 'pendente'
      });
    } else {
      setFormData({
        titulo: '',
        descricao: '',
        prazo: '',
        status: 'pendente'
      });
    }
  }, [currentTask]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentTask) {
        await updateTask(currentTask.id, formData);
      } else {
        await addTask(formData);
      }

      if (onTaskAdded) onTaskAdded();
      if (setCurrentTask) setCurrentTask(null);

      setFormData({
        titulo: '',
        descricao: '',
        prazo: '',
        status: 'pendente'
      });
    } catch (error) {
      alert('Erro ao salvar tarefa');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h2>{currentTask ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
      <div>
        <label>Título:</label>
        <input
          type="text"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Descrição:</label>
        <textarea
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Prazo:</label>
        <input
          type="date"
          name="prazo"
          value={formData.prazo}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Status:</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="pendente">Pendente</option>
          <option value="em andamento">Em Andamento</option>
          <option value="concluída">Concluída</option>
        </select>
      </div>
      <button type="submit">{currentTask ? 'Atualizar' : 'Adicionar'}</button>
    </form>
  );
};

export default TaskForm;
