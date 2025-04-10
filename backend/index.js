import express from 'express';
import cors from 'cors';
import taskRoutes from './Routes/tasks.js'; // IMPORTAR COM .js NO FINAL!

const app = express();

app.use(cors());
app.use(express.json());

app.use('/tasks', taskRoutes);

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
