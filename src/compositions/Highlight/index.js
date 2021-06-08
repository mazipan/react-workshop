import { useState } from 'react';
import { string } from 'prop-types';
import Slider from '../../components/Slider';
import Image from '../../components/Image';
import './styles.css';

const Highlight = (props) => {
  const { src } = props;
  const [imageUrl, setImageUrl] = useState(src);

  const handleClick = (url) => {
    setImageUrl(url);
  };

  return (
    <>
      <Image src={imageUrl} alt="highlight" style={{ marginBottom: '16px' }} />
      <Slider images={[src]} onClick={handleClick} />
    </>
  );
};

Highlight.propTypes = {
  src: string.isRequired,
};

export default Highlight;
