import { string } from 'prop-types';
import './styles.css';

const ProductDescription = (props) => {
  const { description } = props;

  return (
    <div className="product-description">
      <h4 className="product-description-title">Deskripsi</h4>
      <p className="product-description-text">{description}</p>
    </div>
  );
};

ProductDescription.propTypes = {
  description: string.isRequired,
};

export default ProductDescription;
