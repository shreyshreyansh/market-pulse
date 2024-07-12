import express from 'express';
import priceRoutes from './routes/price.route';

const app = express();

app.use('/api', priceRoutes);

export default app;
