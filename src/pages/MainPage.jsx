import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { dispatch } from '../redux/store';
import { getProducts, getProductsIds, getProductsIdsByBrand, getProductsIdsByName, getProductsIdsByPrice } from '../redux/slices/product';
import ProductCard from '../components/product-card/ProductCard';
import ArrowIcon from '../assets/images/arrow-icon.svg';
import styles from './MainPage.module.css';


const MainPage = () => {
  const { 
    productsIds, 
    products, 
    productsIdsByName, 
    productsByName, 
    productsIdsByBrand, 
    productsByBrand, 
    productsIdsByPrice,
    productsByPrice, 
    isLoading, 
    error 
  } = useSelector((state) => state.product);

  const [productsList, setProductsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');

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
    if (productsIdsByName.length) {
      dispatch(getProducts('get_items', {'ids': productsIdsByName}));
    }
    if (productsByName?.length) {
      const newProductsList = removeDublicate(productsByName);
      setProductsList(newProductsList);      
    }
  }, [productsIdsByName, productsByName]);

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

  useEffect(() => {
    if (productsIdsByBrand.length) {
      dispatch(getProducts('get_items', {'ids': productsIdsByBrand}));
    }
    if (productsByBrand?.length) {
      const newProductsList = removeDublicate(productsByBrand);
      setProductsList(newProductsList);      
    }
  }, [productsIdsByBrand, productsByBrand]);

  useEffect(() => {
    if (productsIdsByPrice.length) {
      dispatch(getProducts('get_items', {'ids': productsIdsByPrice}));
    }
    if (productsByPrice?.length) {
      const newProductsList = removeDublicate(productsByPrice);
      setProductsList(newProductsList);      
    }
  }, [productsIdsByPrice, productsByPrice]);

  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
    if (brand || price) {
      setBrand('');
      setPrice('');
    }
  };

  const handleFilterByName = () => {
    dispatch(getProductsIdsByName('filter', {'product': name}));
  };

  const handleChangeBrand = (e) => {
    setBrand(e.target.value);
    if (name || price) {
      setName('');
      setPrice('');
    }
  };

  const handleFilterByBrand = () => {
    dispatch(getProductsIdsByBrand('filter', {'brand': brand}));
  };

  const handleChangePrice = (e) => {
    setPrice(e.target.value);
    if (name || brand) {
      setName('');
      setBrand('');
    }
  };

  const handleFilterByPrice = () => {
    dispatch(getProductsIdsByPrice('filter', {'price': Number(price)}));
  };

  return (
    <div className={styles.main}>
      <aside className={styles.mainSideBar}>
        <h2>Фильтр</h2>
        <div className={styles.mainSideBarFilter}>
          <label>Название <input type="text" value={name} onChange={handleChangeName} /></label>
          <button className={styles.mainSideBarButton} onClick={handleFilterByName}>Отправить</button>
        </div>
        <div className={styles.mainSideBarFilter}>
          <label>Бренд <input type="text" value={brand} onChange={handleChangeBrand} /></label>
          <button className={styles.mainSideBarButton} onClick={handleFilterByBrand}>Отправить</button>
        </div>
        <div className={styles.mainSideBarFilter}>
          <label>Цена <input type="text" value={price} onChange={handleChangePrice} /></label>
          <button className={styles.mainSideBarButton} onClick={handleFilterByPrice}>Отправить</button>
        </div>
      </aside>
      <div className={styles.mainList}>
        {(!isLoading && productsList.length > 0) 
          ? 
          productsList.map(({ id, product, brand, price }) => 
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
            <p>{currentPage}</p>
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
