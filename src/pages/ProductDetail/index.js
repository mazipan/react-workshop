import React from 'react';
import './styles.css';

function ProductDetail({ match }) {
  return (
    <div className="ProductDetail">
      <div className="ProductDetail-header">
        <h2>Welcome to Product Detail: {match.params.id}</h2>
      </div>
    </div>
  );
}

export default ProductDetail;
