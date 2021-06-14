import useIntersect from '@jackyef/use-intersect';
import { object, string } from 'prop-types';
import { useState } from 'react';

import './styles.css';

const Image = (props) => {
  const { alt, src, style } = props;
  const [loaded, setLoaded] = useState(false);

  const onIntersect = () => {
    setLoaded(true);
  };

  // Read the options on https://github.com/jackyef/use-intersect/blob/master/src/index.js#L24
  const targetRef = useIntersect(onIntersect, {}, true);

  const optimizedImage = `${src}.webp?ect=3g`
    .replace('250-square', '200-square')
    .replace('ecs7-p.tokopedia.net', 'images.tokopedia.net');

  return (
    <div className="image-wrapper" ref={targetRef}>
      {/* Only load the image when the wrapper already viewed on the screen */}

      {/* adding .webp, expecting got the webp version */}
      {/* please take a note that not all CDN support this kind of approach */}
      {loaded ? <img className="image" ref={targetRef} alt={alt} src={`${optimizedImage}`} style={style} /> : null}
    </div>
  );
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
