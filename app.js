import express from 'express';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import mensajesRoutes from './routes/mensajesRoutes.js';
import cors from 'cors';

const app = express();

app.use(cors());

// Configure middlewares
app.use(express.json());

// Configure routes
app.use('/auth', authRoutes);
app.use('/mensajes', mensajesRoutes);

app.get("/", (req, res) => {
    res.send("API funcionando yei");
  });

  

export default app 
