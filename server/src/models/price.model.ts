import mongoose, { Schema } from 'mongoose';
import { IPrice } from '../interfaces/price.interface';

const priceSchema = new Schema<IPrice>(
  {
    symbol: { type: String, required: true },
    price: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { collection: 'prices' }
);

const Price = mongoose.model<IPrice>('Price', priceSchema);

export default Price;
