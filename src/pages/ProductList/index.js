import { useMemo } from 'react';
import { gql, useQuery } from '@apollo/client';
import ProductCard from '../../components/ProductCard';
import './styles.css';

const ProductListQuery = gql`
  query GetProductLists($offset: Int, $limit: Int) {
    ProductLists(offset: $offset, limit: $limit) {
      data {
        product_id
        product_price
        product_price_format
        product_name
        rating
        product_image
        product_slug
      }
      offset
      hasNext
    }
  }
`;

const ProductList = () => {
  const { data = {}, loading } = useQuery(ProductListQuery, {
    variables: {
      offset: 0,
      limit: 10,
    },
  });

  const productList = useMemo(() => {
    if (data.ProductLists) {
      return (data.ProductLists.data || []).map((item) => ({
        price: item.product_price_format,
        imageUrl: item.product_image,
        name: item.product_name,
        slug: item.product_slug,
        id: item.product_id,
        rating: item.rating,
      }));
    }

    return [];
  }, [data]);

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div className="product-list">
      {productList.map((product) => (
        <ProductCard to={`${product.id}/${product.slug}`} data={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductList;
