import { Router } from 'express';
import { getPrices } from '../src/controllers/price.controller';

const router = Router();

router.get('/prices/:symbol', getPrices);

export default router;
