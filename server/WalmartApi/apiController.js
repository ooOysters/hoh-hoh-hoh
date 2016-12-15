
const request = require('request');
const walmartId = process.env.API_KEY;

formatUrl = (query) =>
  'http://api.walmartlabs.com/v1/search?query=' 
  + query + '&apiKey=' + walmartId;

search = (query, callback) => {
  request({url: formatUrl(query)}, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      callback(body); 
    } else {
      callback({ error: 'ERROR'});
    }
  });
};
 
modifiedResult = (body) => {
  return body.items.map((product) => {
    return {
      name: product.name,
      itemId: product.itemId,
      price: product.salePrice,
      description: product.longDescription,
      brandName: product.brandName,
      thumbnailImage: product.thumbnailImage,
      mediumImage: product.mediumImage,
      largeImage: product.largeImage,
      productUrl: product.productUrl,
      rating: product.customerRating,
      ratingImage: product.customerRatingImage
    };
  });
};

setDefaultQuery = () => {

  let defaultResult = {
    name: 'Name',
    price: null,
    description: null,
    brandName: null,
    mediumImage: null,
    largeImage: null,
    productUrl: null,
    rating: 0,
    ratingImage: null
  };
  return defaultResult;
};

module.exports = {
  search: search,
  modifiedResult: modifiedResult
};
