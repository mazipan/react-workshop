import { object, string } from 'prop-types';
import './styles.css';

const Image = (props) => {
  const { alt, src, style } = props;
  return <img className="image" alt={alt} src={src} style={style} />;
};

Image.propTypes = {
  alt: string.isRequired,
  src: string.isRequired,
  style: object,
};

Image.defaultProps = {
  style: {},
};

export default Image;
