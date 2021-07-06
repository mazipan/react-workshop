import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';

import ProductDetailQuery from './ProductDetailQuery.graphql';

const ampPDP = async (req, res) => {
  const apolloClient = new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache(),
    link: createHttpLink({
      uri: 'https://asia-southeast2-minitokopedia.cloudfunctions.net/graphql',
    }),
  });

  const { id } = req.params;

  const getPDPOptions = {
    query: ProductDetailQuery,
    variables: {
      productId: Number(id),
    }
  };

  const { data: productData } = await apolloClient.query(getPDPOptions);
  const { ProductDetail } = productData;

  // copy styles from the entire PDP routes
  const customStyles = `
    html {
      font-family: sans-serif;
    }
    
    .header {
      background-color: #371351;
      color: #ffff;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
    }
    
    .header-logo {
      height: 40px;
      width: 163px;
    }

    .image {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      width: 100%;
    }      

    .product-detail {
      padding: 8px;
    }

    .slider {
      overflow-x: auto;
      width: 100%;
      white-space: nowrap;
    }
    
    .slider-item {
      vertical-align: middle;
      display: inline-block;
      margin-right: 16px;
      width: 80px;
      border: 1px solid #e5e7e9;
      box-shadow: 0px 1px 6px rgba(49, 53, 59, 0.12);
      border-radius: 10px;
      padding: 8px;
    }      

    .product-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .product-info-price {
      font-size: 30px;
      font-weight: bold;
    }
    
    .product-info-rating {
      display: flex;
      align-items: center;
    }
    
    .product-info-rating-text {
      margin-left: 8px;
      font-size: 24px;
      color: rgba(49, 53, 59, 0.68);
      font-weight: normal;
    }
    
    .product-info-title {
      font-size: 18px;
      line-height: 21px;
      color: rgba(49, 53, 59, 0.96);
      font-weight: normal;
    } 
    
    .product-description {
      border: 1px solid #e5e7e9;
      border-radius: 10px;
      box-shadow: 0px 1px 6px rgba(49, 53, 59, 0.12);
      padding: 12px;
    }
    
    .product-description-title {
      font-weight: 500;
      font-size: 14px;
    }
    
    .product-description-text {
      line-height: 14px;
      color: rgba(49, 53, 59, 0.68);
    } 
    
    .footer {
      color: #bf13f8;
      font-size: 0.9rem;
      text-align: center;
      padding: 2rem 1rem;
      margin-top: auto;
    }
    
    .footer-link {
      color: #bf13f8;
    }
  `;

  const topBar = `
    <header class="header">
      <a href="/" class="header-link">
        <h1>
          <amp-img width="163px" height="40px" class="header-logo" src="/logo-devcamp-2021.webp" alt="Tokopedia DevCamp 2021" />
        </h1>
      </a>
    </header>
  `;

  const productHighlight = `
    <div>
      <amp-state id="slider">
        <script type="application/json">
          {
            "activeImage":'${ProductDetail.additional_product_image[0]}'
          }
        </script>
      </amp-state>
      <amp-img
        class="image"
        layout="responsive"
        [src]="slider.activeImage"
        src="${ProductDetail.additional_product_image[0]}"
        width="1"
        height="1"
        alt="product photos"
      />
    </div>
    <div class="slider">
      ${ProductDetail.additional_product_image.map((imageUrl, index) => `
        <div
          class="slider-item"
          role="button"
          aria-hidden
        >
          <amp-img
            role="button"
            tabIndex="${index}"
            width="80"
            height="80"
            on="tap:AMP.setState({slider: { activeImage: '${imageUrl}' }})"
            src="${imageUrl}"
            alt="product-${imageUrl}" />
        </div>
      `).join('')}
    </div>
  `;

  const createRatingArray = (rating = 0) => {
    if (rating <= 0) {
      return [];
    }
  
    const arr = new Array(rating);
    return arr.fill(0, 0, rating).map((_, i) => i);
  };
  
  const RatingStar = (rating) => {

    const ratings = createRatingArray(parseInt(rating, 10));
  
    return ratings.map((r) => `
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 16 16">
        <g fill="none">
          <path d="M0 0h16v16H0z" />
          <path
            fill="#FFC400"
            d="M8.698 1.764l1.458 2.931a.772.772 0 0 0 .586.423l3.257.47a.772.772 0 0 1 .432 1.319l-2.357 2.282a.765.765 0 0 0-.224.684l.556 3.221c.109.632-.558 1.114-1.13.816l-2.914-1.521a.779.779 0 0 0-.724 0l-2.914 1.52c-.571.299-1.24-.183-1.13-.815l.556-3.221a.766.766 0 0 0-.224-.684L1.57 6.907A.771.771 0 0 1 2 5.588l3.258-.47a.775.775 0 0 0 .587-.423l1.457-2.93a.78.78 0 0 1 1.396 0"
          />
        </g>
      </svg>
    `).join('');
  };

  const pdpInfo = `
    <div class="product-info">
      <h2 class="product-info-price">${ProductDetail.product_price_format}</h2>
      <div class="product-info-rating">
        ${RatingStar(ProductDetail.rating)}
        <p class="product-info-rating-text">(${ProductDetail.rating})</p>
      </div>
    </div>
    <h3 class="product-info-title">${ProductDetail.product_name}</h3>
  `;

  const productDescription = `
    <div class="product-description">
      <h4 class="product-description-title">Deskripsi</h4>
      <p class="product-description-text">${ProductDetail.product_description}</p>
    </div>
  `;

  const footer = `
    <footer class="footer">
      <span>
        &copy; 2021 -&nbsp;
        <a href="https://academy.tokopedia.com/events/dev-camp" class="footer-link">
          Tokopedia DevCamp
        </a>
      </span>
    </footer>
  `;

  const ampHtml = `
    ${topBar}
    <div class="product-detail">
      ${productHighlight}
      ${pdpInfo}
      ${productDescription}
    </div>
    ${footer}
  `;

  const ampBoilerplate = `
    <!doctype html>
    <html ⚡ lang="en">
    <head>
      <meta charset="utf-8">
      <title>${ProductDetail.product_name}</title>
      <script async src="https://cdn.ampproject.org/v0.js"></script>
      <script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
      <link rel="canonical" href="${req.protocol}://${req.get('host')}${req.url.replace('/amp', '')}">
      <meta name="viewport" content="width=device-width">
      <style amp-custom>
        ${customStyles}
      </style>
      <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    </head>
    <body>
      ${ampHtml}
    </body>
    </html>
  `;

  res.status(200).header('Content-Type', 'text/html').send(ampBoilerplate);
}

export default ampPDP;