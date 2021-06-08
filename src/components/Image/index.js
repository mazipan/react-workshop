import { string } from 'prop-types';
import './styles.css';

const Image = (props) => {
  const { alt, src } = props;
  return <img className="image" alt={alt} src={src} />;
};

Image.propTypes = {
  alt: string.isRequired,
  src: string.isRequired,
};

export default Image;
