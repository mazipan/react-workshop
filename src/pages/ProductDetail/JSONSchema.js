import { Helmet } from 'react-helmet-async'; 
import { number, string, arrayOf } from "prop-types";

const ProductSchema = ({ id, slug, title, description, price, imageUrl }) => {

  return (
    <Helmet>
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": "${title}",
            "sku": "${id}",
            "mpn": "${id}",
            "image": ["${imageUrl}"],
            "description": "${description}",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.4",
              "reviewCount": "89"
            },
            "offers": {
              "@type": "Offer",
              "url": "https://www.tokopedia.com/${id}/${slug}",
              "priceCurrency": "IDR",
              "priceValidUntil": "2022-12-12",
              "price": "${price}",
              "itemCondition": "https://schema.org/UsedCondition",
              "availability": "https://schema.org/InStock"
            }
          }
        `}
      </script>
    </Helmet>
  )
}

ProductSchema.propTypes = {
  price: number.isRequired,
  title: string.isRequired,
  id: string.isRequired,
  slug: string.isRequired,
  description: string.isRequired,
  imageUrl: string.isRequired,
};

export default ProductSchema;
