import { string } from 'prop-types';
import RatingStar from '../RatingStar';
import './styles.css';

const ProductInfo = (props) => {
  const { price, rating, title } = props;

  return (
    <>
      <div className="product-info">
        <h1 className="product-info-price">{price}</h1>
        <div className="product-info-rating">
          <RatingStar rating="1" width="26" height="26" />
          <p className="product-info-rating-text">({rating})</p>
        </div>
      </div>
      <h3 className="product-info-title">{title}</h3>
    </>
  );
};

ProductInfo.propTypes = {
  price: string.isRequired,
  title: string.isRequired,
  rating: string.isRequired,
};

export default ProductInfo;
