import { Document } from 'mongoose';

export interface IPrice extends Document {
  symbol: string;
  price: number;
  timestamp: Date;
}
