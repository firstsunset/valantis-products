import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { dispatch } from '../redux/store';
import { getProducts, getProductsIds } from '../redux/slices/product';
import ProductCard from '../components/product-card/ProductCard';
import ArrowIcon from '../assets/images/arrow-icon.svg';
import styles from './MainPage.module.css';


const MainPage = () => {
  const { productsIds, products, isLoading, error } = useSelector((state) => state.product);

  const [productsList, setProductsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  const removeDublicate = (arr) => {
    const seen = new Set();
      const filteredArray = arr.filter(product => {
        const dublicate = seen.has(product.id);
        seen.add(product.id);
        return !dublicate;
      });
      return filteredArray;
  };

  useEffect(() => {
    dispatch(getProductsIds('get_ids', {'offset': 1, 'limit': itemsPerPage}));
  }, []);

  useEffect(() => {
    if (productsIds.length) {
      dispatch(getProducts('get_items', {'ids': productsIds}));
    }
  }, [productsIds]);

  useEffect(() => {
    if (products?.length) {
      const newProductsList = removeDublicate(products);
      setProductsList(newProductsList);      
    }
  }, [products]);

  useEffect(() => {
    if (currentPage > 1) {
      dispatch(getProductsIds('get_ids', {'offset': currentPage, 'limit': itemsPerPage}));      
    }
  }, [currentPage]); 

  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };


  return (
    <div className={styles.main}>
      <div className={styles.mainList}>
        {(!isLoading && productsList.length > 0) ? productsList.map(({ id, product, brand, price }) => 
          <ProductCard key={id} id={id} name={product} brand={brand} price={price}/>)
          : 
          <p>Loading...</p>
        }
        {(!isLoading && productsList.length > 0) && 
          <div className={styles.pagination}>
            {currentPage !== 1 &&
              <button className={styles.buttonBack} onClick={prevPage} disabled={currentPage === 1}>
                <img src={ArrowIcon} width={16} height={16} />
              </button>}
            <p>Page {currentPage}</p>
            {products.length >= itemsPerPage &&
              <button className={styles.button} onClick={nextPage} disabled={products.length < itemsPerPage}>
              <img src={ArrowIcon} width={16} height={16} />              
            </button>}
          </div>}
      </div>
    </div>
  )
}

export default MainPage
