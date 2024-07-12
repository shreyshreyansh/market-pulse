'use client';

import { Provider } from 'react-redux';
import { store, persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import PriceTable from '@/components/PriceTable';

const Home = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PriceTable />
      </PersistGate>
    </Provider>
  );
};

export default Home;
