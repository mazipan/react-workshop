import './styles.css';

import Skeleton from '../Skeleton';

const Loader = () => {
  return (
    <div className="product-card">
      <Skeleton style={{ width: '100%', height: '224px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} />
      <div className="product-card-info">
        <Skeleton style={{ width: '100%', height: '14px', borderRadius: '10px' }} />
        <Skeleton style={{ width: '100%', height: '14px', borderRadius: '10px' }} />
        <Skeleton style={{ width: '100px', height: '18px', margin: '1em 0', borderRadius: '10px' }} />
        <div className="product-card-info-rating">
					<Skeleton style={{ width: '16px', height: '16px', margin: '1px', borderRadius: '10px' }} />
					<Skeleton style={{ width: '16px', height: '16px', margin: '1px', borderRadius: '10px' }} />
					<Skeleton style={{ width: '16px', height: '16px', margin: '1px', borderRadius: '10px' }} />
					<Skeleton style={{ width: '16px', height: '16px', margin: '1px', borderRadius: '10px' }} />
					<Skeleton style={{ width: '16px', height: '16px', margin: '1px', borderRadius: '10px' }} />
        </div>
      </div>
    </div>
  );
};

export default Loader;
