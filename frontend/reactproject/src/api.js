const BASE_URL = 'http://localhost:3001/tasks';

export const getTasks = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('Erro ao buscar tarefas');
    return await response.json();
  } catch (error) {
    console.error('Erro em getTasks:', error);
    throw error;
  }
};

export const addTask = async (task) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error('Erro ao adicionar tarefa');
    return await response.json();
  } catch (error) {
    console.error('Erro em addTask:', error);
    throw error;
  }
};

export const updateTask = async (id, updatedTask) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });
    if (!response.ok) throw new Error('Erro ao atualizar tarefa');
    return await response.json();
  } catch (error) {
    console.error('Erro em updateTask:', error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar tarefa');
  } catch (error) {
    console.error('Erro em deleteTask:', error);
    throw error;
  }
};

export const getTaskById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar tarefa por ID');
    return await response.json();
  } catch (error) {
    console.error('Erro em getTaskById:', error);
    throw error;
  }
};
