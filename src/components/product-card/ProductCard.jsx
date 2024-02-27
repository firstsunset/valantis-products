import React from 'react';
import styles from './ProductCard.module.css';


function ProductCard({ id, name, brand, price }) {
 
  return (
    <div className={styles.card}>
      <div className={styles.cardMain}>
        <div>
          <p className={styles.cardText}>id: <span className={styles.cardTextBold}>{id}</span></p>
          <h1 className={styles.cardTitle}>{name}</h1>
        </div>
        <div>
          <p className={styles.cardText}>Бренд: <span className={styles.cardTextBold}>{brand}</span></p>
          <p className={styles.cardPrice}>{price} <span className={styles.cardPriceRub}>₽</span></p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

