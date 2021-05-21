import React from 'react';
import './styles.css';

// TODO: replace with real data
import { mockData } from './mock-data';

import ProductCard from '../../components/ProductCard';

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <div>
          <h2 className="Home-title">Welcome to Tokopedia DevCamp 2021</h2>
          <div className="Home-product-grid">
            {mockData &&
              mockData.data.length > 0 &&
              mockData.data.map((product) => (
                <ProductCard
                  key={product.product_id}
                  name={product.product_name}
                  slug={product.product_slug}
                  image={product.product_image}
                  price={product.product_price_format}
                  rating={product.rating}
                />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
