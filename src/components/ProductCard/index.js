import { Link } from 'react-router-dom';
import { string, shape, number, objectOf } from 'prop-types';
import RatingStar from '../RatingStar';
import Image from '../Image';
import './styles.css';

const ProductCard = (props) => {
  const { to, data, style } = props;

  return (
    <Link to={to} className="product-card" style={style}>
      <Image src={data.imageUrl} alt={data.name} />
      <div className="product-card-info">
        <h3 className="product-card-info-name">{data.name}</h3>
        <strong className="product-card-info-price">{data.price}</strong>
        <div className="product-card-info-rating">
          {data.rating !== '0' && data.rating ? (
            <>
              <RatingStar rating={data.rating} />
              <span className="product-card-info-rating-text">{`(${data.rating})`}</span>
            </>
          ) : null}
        </div>
      </div>
    </Link>
  );
};

ProductCard.propTypes = {
  to: string.isRequired,
  style: objectOf(string),
  data: shape({
    name: string,
    price: string,
    rating: string,
    imageUrl: string,
    slug: string,
    id: number,
  }).isRequired,
};

ProductCard.defaultProps = {
  style: {},
};

export default ProductCard;
