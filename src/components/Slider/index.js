import { arrayOf, func, string } from 'prop-types';
import Image from '../Image';
import './styles.css';
import mocks from './mocks';

const Slider = (props) => {
  const { images, onClick } = props;

  return (
    <div className="slider">
      {(mocks || images).map((imageUrl) => (
        <div className="slider-item" onClick={() => onClick(imageUrl)} role="button" aria-hidden>
          <Image src={imageUrl} alt={`product-${imageUrl}`} key={imageUrl} />
        </div>
      ))}
    </div>
  );
};

Slider.propTypes = {
  onClick: func.isRequired,
  images: arrayOf(string).isRequired,
};

export default Slider;
