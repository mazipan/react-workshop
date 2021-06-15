import { string } from 'prop-types';

const createRatingArray = (rating = 0) => {
  if (rating <= 0) {
    return [];
  }

  const arr = new Array(rating);
  return arr.fill(0, 0, rating).map((_, i) => i);
};

const RatingStar = (props) => {
  const { rating, width, height } = props;
  const ratings = createRatingArray(parseInt(rating, 10));

  return ratings.map((r) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 16 16" key={r}>
      <g fill="none">
        <path d="M0 0h16v16H0z" />
        <path
          fill="#FFC400"
          d="M8.698 1.764l1.458 2.931a.772.772 0 0 0 .586.423l3.257.47a.772.772 0 0 1 .432 1.319l-2.357 2.282a.765.765 0 0 0-.224.684l.556 3.221c.109.632-.558 1.114-1.13.816l-2.914-1.521a.779.779 0 0 0-.724 0l-2.914 1.52c-.571.299-1.24-.183-1.13-.815l.556-3.221a.766.766 0 0 0-.224-.684L1.57 6.907A.771.771 0 0 1 2 5.588l3.258-.47a.775.775 0 0 0 .587-.423l1.457-2.93a.78.78 0 0 1 1.396 0"
        />
      </g>
    </svg>
  ));
};

RatingStar.propTypes = {
  rating: string.isRequired,
  width: string,
  height: string,
};

RatingStar.defaultProps = {
  width: '16',
  height: '16',
};

export default RatingStar;
