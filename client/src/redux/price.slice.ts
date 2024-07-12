import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store'; // Adjust this import based on your file structure

interface Price {
  symbol: string;
  price: number;
  timestamp: string;
}

interface PriceState {
  prices: Price[];
  symbol: string;
}

const initialState: PriceState = {
  prices: [],
  symbol: 'GOOG',
};

export const fetchPrices = createAsyncThunk<
  Price[],
  string,
  { state: RootState }
>('price/fetchPrices', async (symbol: string, thunkAPI) => {
  try {
    const response = await axios.get(`/api/prices/${symbol}`);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data); // Handle error cases
  }
});

const priceSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {
    setSymbol(state, action: PayloadAction<string>) {
      state.symbol = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPrices.fulfilled, (state, action) => {
      state.prices = action.payload;
    });
  },
});

export const { setSymbol } = priceSlice.actions;
export default priceSlice.reducer;
