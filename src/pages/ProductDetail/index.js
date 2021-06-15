import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

import './styles.css';
import Highlight from '../../compositions/Highlight/index';
import ProductInfo from '../../components/ProductInfo';
import ProductDescription from '../../components/ProductDescription';

const ProductDetaulQuery = gql`
  query GetProductLists($productId: Int) {
    ProductDetail(productId: $productId) {
      product_id
      product_price
      product_price_format
      product_name
      product_image
      product_description
      additional_product_image
      rating
    }
  }
`;

const ProductDetail = () => {
  const { id } = useParams();

  const { data = {}, loading } = useQuery(ProductDetaulQuery, {
    variables: {
      productId: Number(id),
    },
  });

  const product = useMemo(() => {
    if (data.ProductDetail) {
      return {
        id: data.ProductDetail.product_id || 0,
        name: data.ProductDetail.product_name || '',
        imageUrl: data.ProductDetail.product_image || '',
        imageOptsUrl: data.ProductDetail.additional_product_image || [],
        price: data.ProductDetail.product_price_format || '',
        rating: data.ProductDetail.rating || '0',
        description: data.ProductDetail.product_description || '',
      };
    }

    return {};
  }, [data]);

  return (
    <div className="product-detail">
      {loading ? (
        <p>loading...</p>
      ) : (
        <>
          <Highlight src={product.imageUrl} srcOpts={product.imageOptsUrl} />
          <ProductInfo title={product.name} rating={product.rating} price={product.price} />
          <ProductDescription description={product.description} />
        </>
      )}
    </div>
  );
};

export default ProductDetail;
