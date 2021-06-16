import { string } from 'prop-types';
import { Helmet } from 'react-helmet-async';

const OpenGraph = ({ title, description, id, slug, imageUrl }) => {

  const productUrl = `https://www.tokopedia.com/${id}/${slug}`;

  return (
    <Helmet>
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={productUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={productUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />
    </Helmet>
  );
};

OpenGraph.propTypes = {
  id: string.isRequired,
  slug: string.isRequired,
  description: string.isRequired,
  imageUrl: string.isRequired,
}

export default OpenGraph;
