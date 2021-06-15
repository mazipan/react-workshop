import { useState } from 'react';
import { arrayOf, string } from 'prop-types';
import Slider from '../../components/Slider';
import Image from '../../components/Image';
import './styles.css';

const Highlight = (props) => {
  const { src, srcOpts } = props;

  const [imageUrl, setImageUrl] = useState(src);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (url) => {
    setImageUrl(url);

    setActiveIndex(srcOpts.findIndex((u) => url === u));
  };

  return (
    <>
      <Image src={imageUrl} alt="highlight" style={{ marginBottom: '16px' }} />
      <Slider images={srcOpts} activeIndex={activeIndex} onClick={handleClick} />
    </>
  );
};

Highlight.propTypes = {
  src: string.isRequired,
  srcOpts: arrayOf(string),
};

Highlight.defaultProps = {
  srcOpts: [],
};

export default Highlight;
