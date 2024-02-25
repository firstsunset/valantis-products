import React, {useEffect} from 'react';
import ProductCard from '../components/product-card/ProductCard';
import { useSelector } from 'react-redux';
import { dispatch } from '../redux/store';
import { getProducts } from '../redux/slices/product';

const MainPage = () => {
  const products = useSelector((state) => state.product.products);
  useEffect(() => {
    dispatch(getProducts('get_ids', {'offset': 4, 'limit': 50}));
  }, []);
  console.log(products);
  return (
    <div>
      <ProductCard />
    </div>
  )
}

export default MainPage
