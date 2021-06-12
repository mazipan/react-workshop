import { arrayOf, func, number, string } from 'prop-types';
import Image from '../Image';
import './styles.css';

const Slider = (props) => {
  const { activeIndex, images, onClick } = props;

  return (
    <div className="slider">
      {images.map((imageUrl, index) => (
        <div
          className="slider-item"
          style={{ border: index === activeIndex ? '2px solid #00FFFF' : '' }}
          onClick={() => onClick(imageUrl)}
          role="button"
          aria-hidden
        >
          <Image src={imageUrl} alt={`product-${imageUrl}`} key={imageUrl} />
        </div>
      ))}
    </div>
  );
};

Slider.propTypes = {
  activeIndex: number.isRequired,
  images: arrayOf(string).isRequired,
  onClick: func.isRequired,
};

export default Slider;
