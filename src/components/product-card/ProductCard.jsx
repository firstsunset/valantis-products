import React from 'react';
import styles from './ProductCard.module.css';


function ProductCard({ id, name, brand, price }) {
 
  return (
    <div className={styles.card}>
      <div className={styles.cardMain}>
        <p className={styles.cardCode}>Id {id}</p>
        <h1 className={styles.cardTitle}>Название{name}</h1>
        <p className={styles.cardCode}>Бренд {brand}</p>
        <p className={styles.cardPrice}>Цена{price} <span className={styles.cardPriceRub}>₽</span></p>
      </div>
    </div>
  );
}

export default ProductCard;

