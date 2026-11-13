import express from 'express';
import dotenv from 'dotenv';

import ensaioRoutes from './routes/ensaioRoutes.js';
import equipamentoRoutes from './routes/equipamentoRoutes.js';
import analistaRoutes from './routes/analistaRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use(ensaioRoutes);
app.use(equipamentoRoutes);
app.use(analistaRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});