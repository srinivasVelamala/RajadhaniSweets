import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 5000;

  app.use(cors());
  app.use(express.json({ limit: '10mb' }));