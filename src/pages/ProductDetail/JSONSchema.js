import { Helmet } from 'react-helmet-async'; 
import { string } from "prop-types";

const ProductSchema = ({ id, slug, title, description, price }) => {

  return (
    <Helmet>
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": "${title}",
            "image": [
              "https://example.com/photos/1x1/photo.jpg",
              "https://example.com/photos/4x3/photo.jpg",
              "https://example.com/photos/16x9/photo.jpg"
            ],
            "description": "${description}",
            "review": {
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "4",
                "bestRating": "5"
              }
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.4",
              "reviewCount": "89"
            },
            "offers": {
              "@type": "Offer",
              "url": "https://localhost:3000/${id}/${slug}",
              "priceCurrency": "IDR",
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
  price: string.isRequired,
  title: string.isRequired,
  id: string.isRequired,
  slug: string.isRequired,
  description: string.isRequired,
};

export default ProductSchema;
