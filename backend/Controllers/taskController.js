import db from '../db.js';

export const getAllTasks = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tasks');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createTask = async (req, res) => {
  const { titulo, descricao, status, prazo } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO tasks (titulo, descricao, status, prazo) VALUES (?, ?, ?, ?)',
      [titulo, descricao, status, prazo]
    );
    res.status(201).json({ message: 'Tarefa criada com sucesso', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, status, prazo } = req.body;
  try {
    await db.query(
      'UPDATE tasks SET titulo=?, descricao=?, status=?, prazo=? WHERE id=?',
      [titulo, descricao, status, prazo, id]
    );
    res.json({ message: 'Tarefa atualizada com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM tasks WHERE id=?', [id]);
    res.json({ message: 'Tarefa removida com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
