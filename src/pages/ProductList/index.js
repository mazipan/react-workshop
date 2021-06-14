import { useMemo } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet-async';

import ProductCard from '../../components/ProductCard';
import Loader from '../../components/ProductCard/Loader';
import styles from './styles.css';

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
    // default is true, so you can remove this actually
    // just to make you aware of this
    ssr: true,
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

  const mainImage = useMemo(() => {
    if (productList.length > 1) {
      /* adding .webp, expecting got the webp version */
      /* please take a note that not all CDN support this kind of approach */

      /* Preload image on index 0, this is an optimistic code */
      /* In the real life, you might be need to check the avaiability of productList[0] first */
      return `${productList[0].imageUrl}.webp?ect=3g`
        .replace('250-square', '200-square')
        .replace('ecs7-p.tokopedia.net', 'images.tokopedia.net');
    }

    return '';
  }, [productList]);

  return loading ? (
    <div className={styles["product-list"]}>
      {[1, 2, 3, 4].map((idx) => (
        <Loader key={idx} />
      ))}
    </div>
  ) : (
    <>
      <Helmet>
        <link rel="preload" href={`${mainImage}`} as="image" />
      </Helmet>
      <div className={styles["product-list"]}>
        {productList.map((product) => (
          <ProductCard to={`${product.id}/${product.slug}`} data={product} key={product.id} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
