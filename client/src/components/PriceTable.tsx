import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchPrices, setSymbol } from '../redux/price.slice';
import { RootState, store } from '../redux/store';
import SymbolModal from './SymbolModal';
import styles from './PriceTable.module.css'; // Import CSS module

const PriceTable = () => {
  const { prices, symbol } = useSelector((state: RootState) => state.price);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAndSetPrices = () => {
      store.dispatch(fetchPrices(symbol));
    };

    fetchAndSetPrices(); // Initial fetch

    const interval = setInterval(fetchAndSetPrices, 5000); // Fetch every 5 seconds

    return () => {
      clearInterval(interval);
    };
  }, [symbol]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleChangeSymbol = (newSymbol: string) => {
    store.dispatch(setSymbol(newSymbol));
    setShowModal(false); // Close the modal after changing the symbol
  };

  return (
    <div className={styles['price-table-container']}>
      <button className={styles['change-symbol-button']} onClick={toggleModal}>
        Change Symbol
      </button>
      <h1>Prices for {symbol}</h1>
      <table className={`${styles['centered-table']} ${styles['price-table']}`}>
        <thead>
          <tr>
            <th>Price</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((price) => (
            <tr key={price.timestamp}>
              <td>$ {price.price}</td>
              <td>{new Date(price.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <SymbolModal
          currentSymbol={symbol}
          onClose={toggleModal}
          onChangeSymbol={handleChangeSymbol}
        />
      )}
    </div>
  );
};

export default PriceTable;
