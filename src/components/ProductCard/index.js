import { Link } from 'react-router-dom';
import './styles.css';

import RatingStar from '../RatingStar';

function ProductCard({ name, slug, price, image, rating }) {
  return (
    <Link className="ProductCard" to={`/product/${slug}`}>
      <img className="ProductCard-img" src={image} alt={name} />
      <div className="ProductCard-info">
        <h3 className="ProductCard-name">{name}</h3>
        <strong className="ProductCard-price">{price}</strong>
        <div className="ProductCard-rating">
          <RatingStar rating={rating} /> <span>({parseFloat(rating).toFixed(1)})</span>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
