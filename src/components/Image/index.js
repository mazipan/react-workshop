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

  return (
    <div className="image-wrapper" ref={targetRef}>
			{/* Only load the image when the wrapper already viewed on the screen */}
      {loaded ? <img className="image" ref={targetRef} alt={alt} src={src} style={style} /> : null}
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
