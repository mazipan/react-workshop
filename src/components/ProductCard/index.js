import React from 'react';
import { Link } from 'react-router-dom';
import { string } from 'prop-types';

const ProductCard = (props) => {
  const { to, data } = props;

  return (
    <Link to={to}>
      <img src={data.imageUrl} alt={data.name} />
      <div className="product-card-info">
        <h3 className="product-card-info-name">{data.name}</h3>
        <strong className="product-card-info-price">{data.price}</strong>
        <div className="product-card-info-rating">
          <RatingStar />
        </div>
      </div>
    </Link>
  );
};

ProductCard.propTypes = {
  to: string,
};

export default ProductCard;
