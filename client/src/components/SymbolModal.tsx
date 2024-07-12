import React, { useState, useEffect } from 'react';
import styles from './SymbolModal.module.css'; // Import CSS module

interface Props {
  currentSymbol: string;
  onClose: () => void;
  onChangeSymbol: (newSymbol: string) => void;
}

const SymbolModal: React.FC<Props> = ({
  currentSymbol,
  onClose,
  onChangeSymbol,
}) => {
  const [newSymbol, setNewSymbol] = useState(currentSymbol);

  const handleSymbolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewSymbol(e.target.value);
  };

  const handleSave = () => {
    onChangeSymbol(newSymbol);
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const modalOverlay = document.getElementById('modalOverlay');
      if (
        modalOverlay &&
        e.target instanceof Node &&
        !modalOverlay.contains(e.target)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className={styles.modalOverlay} id="modalOverlay">
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <span className={styles.close} onClick={onClose}>
            &times;
          </span>
          <h2>Change Symbol</h2>
          <select
            id="symbolSelect"
            value={newSymbol}
            onChange={handleSymbolChange}
            className={styles.select}
          >
            <option value="GOOG">Google</option>
            <option value="META">Meta</option>
            <option value="AAPL">Apple</option>
            <option value="NFLX">Netflix</option>
            <option value="AMZN">Amazon</option>
          </select>
          <button onClick={handleSave} className={styles.saveButton}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SymbolModal;
