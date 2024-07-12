import { Request, Response } from 'express';
import { fetchPriceBySymbol } from '../../services/price.service';

export const getPrices = async (req: Request, res: Response) => {
  const { symbol } = req.params;
  const prices = await fetchPriceBySymbol(symbol);
  res.json(prices);
};
