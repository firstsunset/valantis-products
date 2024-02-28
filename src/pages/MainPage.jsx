import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { dispatch } from '../redux/store';
import { 
  getProducts, 
  getProductsIds, 
  getProductsIdsByBrand, 
  getProductsIdsByName, 
  getProductsIdsByPrice } from '../redux/slices/product';
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
  const [isFilter, setIsFilter] = useState(false);

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
    if (error) {
      dispatch(getProductsIds('get_ids', {'offset': 1, 'limit': itemsPerPage}));
    }
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
    if (error) {
      if (currentPage > 1) {
        dispatch(getProductsIds('get_ids', {'offset': currentPage, 'limit': itemsPerPage}));      
      } 
    }
  }, [currentPage]); 

  useEffect(() => {
    if (productsIdsByName.length) {
      dispatch(getProducts('get_items', {'ids': productsIdsByName}));
    } 

    if (error) {
      if (productsIdsByName.length) {
        dispatch(getProducts('get_items', {'ids': productsIdsByName}));
      } 
    }

    if (productsByName?.length) {
      const newProductsList = removeDublicate(productsByName);
      setProductsList(newProductsList);      
    } else {
      setProductsList([]);      
    }
  }, [productsIdsByName, productsByName]);

  useEffect(() => {
    if (productsIdsByBrand.length) {
      dispatch(getProducts('get_items', {'ids': productsIdsByBrand}));
    }

    if (error) {
      if (productsIdsByBrand.length) {
        dispatch(getProducts('get_items', {'ids': productsIdsByBrand}));
      }
    }

    if (productsByBrand?.length) {
      const newProductsList = removeDublicate(productsByBrand);
      setProductsList(newProductsList);      
    } else {
      setProductsList([]);   
    }
  }, [productsIdsByBrand, productsByBrand]);

  useEffect(() => {
    if (productsIdsByPrice.length) {
      dispatch(getProducts('get_items', {'ids': productsIdsByPrice}));
    }

    if (error) {
      if (productsIdsByPrice.length) {
        dispatch(getProducts('get_items', {'ids': productsIdsByPrice}));
      }
    }

    if (productsByPrice?.length) {
      const newProductsList = removeDublicate(productsByPrice);
      setProductsList(newProductsList);      
    } else {
      setProductsList([]);   
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
    if (error) {
      dispatch(getProductsIdsByName('filter', {'product': name}));
    }
    setIsFilter(true);
  };

  const handleKeyDownName = (e) => {
    if (e.key === 'Enter') {
      handleFilterByName();
    }
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
    if (error) {
      dispatch(getProductsIdsByBrand('filter', {'brand': brand}));
    }
    setIsFilter(true);
  };

  const handleKeyDownBrand = (e) => {
    if (e.key === 'Enter') {
      handleFilterByBrand();
    }
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
    if (error) {
      dispatch(getProductsIdsByPrice('filter', {'price': Number(price)}));  
    }
    setIsFilter(true);
  };

  const handleKeyDownPrice = (e) => {
    if (e.key === 'Enter') {
      handleFilterByPrice();
    }
  };

  const handleResetFilter = () => {
    dispatch(getProductsIds('get_ids', {'offset': 1, 'limit': itemsPerPage}));
    if (error) {
      dispatch(getProductsIds('get_ids', {'offset': 1, 'limit': itemsPerPage}));
    }
    setName('');
    setBrand('');
    setPrice('');
    setIsFilter(false); 
    setCurrentPage(1);
  };


  return (
    <div className={styles.main}>
      <aside className={styles.mainSideBar}>
        <h2>Фильтр</h2>
        <div>
          <div className={styles.mainSideBarFilter}>
            <label>Название <input type="text" value={name} onChange={handleChangeName} onKeyDown={handleKeyDownName} /></label>
            <button className={styles.mainSideBarButton} onClick={handleFilterByName}>Применить</button>
          </div>
          <div className={styles.mainSideBarFilter}>
            <label>Бренд <input type="text" value={brand} onChange={handleChangeBrand} onKeyDown={handleKeyDownBrand} /></label>
            <button className={styles.mainSideBarButton} onClick={handleFilterByBrand}>Применить</button>
          </div>
          <div className={styles.mainSideBarFilter}>
            <label>Цена <input type="text" value={price} onChange={handleChangePrice} onKeyDown={handleKeyDownPrice} /></label>
            <button className={styles.mainSideBarButton} onClick={handleFilterByPrice}>Применить</button>
          </div>
        </div>
        <button className={styles.mainSideBarButton} onClick={handleResetFilter}>Сбросить фильтр</button>
      </aside>
      <div className={styles.mainBlock}>
        <div className={styles.mainList}>
          {(isFilter && !isLoading && !productsList.length) &&
            <p>Нет результатов, удовлетворяющих поиску</p>
          }
          {(!isLoading && productsList.length > 0) 
            ? 
            productsList.map(({ id, product, brand, price }) => 
            <ProductCard key={id} id={id} name={product} brand={brand} price={price}/>)
            : 
            (isFilter && !isLoading && !productsList.length) ? null :
            <div className={styles.loaderBlock}>
              <span className={styles.loader}></span>
            </div>
          }
        </div>
        {(!isLoading && !isFilter && productsList.length > 0) && 
          <div className={styles.pagination}>
            {currentPage !== 1 &&
              <button className={styles.buttonBack} onClick={prevPage} disabled={currentPage === 1}>
                <img src={ArrowIcon} alt='arrow icon' width={16} height={16} />
              </button>}
            <p>{currentPage}</p>
            {products.length >= itemsPerPage &&
              <button className={styles.button} onClick={nextPage} disabled={products.length < itemsPerPage}>
              <img src={ArrowIcon} alt='arrow icon' width={16} height={16} />              
            </button>}
          </div>
        }
      </div>
    </div>
  )
}

export default MainPage
