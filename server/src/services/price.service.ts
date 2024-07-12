import axios from 'axios';
import Price from '../models/price.model';
import dotenv from 'dotenv';
import { IPrice } from '../interfaces/price.interface';
import { IPriceResponse } from '../interfaces/price-response.interface';
import { SYMBOLS } from '../constants/symbols.constant';

dotenv.config();

async function fetchPrices(): Promise<IPriceResponse> {
  /**
   * Get your API key from https://twelvedata.com
   * API doc: https://twelvedata.com/docs
   */
  const response = await axios.get<IPriceResponse>(
    `https://api.twelvedata.com/price?symbol=${SYMBOLS.join()}&apikey=${
      process.env.TWELVE_DATA_API_KEY
    }`
  );
  return response.data;
}

async function pollPrices() {
  console.log('Polling prices at:', new Date().toISOString());
  try {
    const prices = await fetchPrices();
    const stockKeys = Object.keys(prices);

    const priceDocuments = stockKeys
      .map((symbol) => {
        if (prices[symbol].price) {
          return new Price({
            symbol,
            price: prices[symbol].price,
          });
        }
        return null;
      })
      .filter(Boolean);

    if (priceDocuments.length > 0) {
      await Price.insertMany(priceDocuments);
      console.log(`Inserted ${priceDocuments.length} price records`);
    }
  } catch (error) {
    console.error('Error polling prices:', error);
  }
  console.log('Finished polling prices at:', new Date().toISOString());
}

async function fetchPriceBySymbol(symbol: string): Promise<IPrice[]> {
  return Price.find({ symbol }).sort({ timestamp: -1 }).limit(20);
}

setInterval(pollPrices, 5000); // Poll every 5 seconds

export { fetchPrices, pollPrices, fetchPriceBySymbol };
