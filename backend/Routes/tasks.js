import express from 'express';
import db from '../db.js';

const router = express.Router();

// Listar todas as tarefas
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tasks');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
});

// Buscar tarefa por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefa por ID' });
  }
});

// Adicionar nova tarefa
router.post('/', async (req, res) => {
  const { titulo, descricao, status, prazo } = req.body;
  try {
    await db.query(
      'INSERT INTO tasks (titulo, descricao, status, prazo) VALUES (?, ?, ?, ?)',
      [titulo, descricao, status, prazo]
    );
    res.status(201).json({ message: 'Tarefa adicionada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar tarefa' });
  }
});

// Atualizar tarefa
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, status, prazo } = req.body;
  try {
    await db.query(
      'UPDATE tasks SET titulo = ?, descricao = ?, status = ?, prazo = ? WHERE id = ?',
      [titulo, descricao, status, prazo, id]
    );
    res.json({ message: 'Tarefa atualizada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
});

// Deletar tarefa
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM tasks WHERE id = ?', [id]);
    res.json({ message: 'Tarefa deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar tarefa' });
  }
});

export default router;
