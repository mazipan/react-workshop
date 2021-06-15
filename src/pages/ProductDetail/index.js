import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet-async';

import './styles.css';
import Highlight from '../../compositions/Highlight/index';
import ProductInfo from '../../components/ProductInfo';
import ProductDescription from '../../components/ProductDescription';
import JSONSchema from './JSONSchema';
import ProductDetailQuery from './query.graphql';

const ProductDetail = () => {
  const { id, slug } = useParams();

  const { data = {}, loading } = useQuery(ProductDetailQuery, {
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
          <Helmet>
            <title>{product.name}</title>
            <meta name="description" content={product.description} />
            <link rel="canonical" href={`http://localhost:3000/${id}/${slug}`} />
          </Helmet>
          <Highlight src={product.imageUrl} srcOpts={product.imageOptsUrl} />
          <ProductInfo title={product.name} rating={product.rating} price={product.price} />
          <ProductDescription description={product.description} />
          <JSONSchema id={id} slug={slug} description={product.description} price={product.price} title={product.name} />
        </>
      )}
    </div>
  );
};

export default ProductDetail;
