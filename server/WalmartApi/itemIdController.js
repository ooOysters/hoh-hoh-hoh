const request = require('request');
const walmartId = process.env.API_KEY;

searchId = (itemId) => 
  'http://api.walmartlabs.com/v1/items?ids='
   + itemId + '&apiKey=' + walmartId;

searchItemId = (itemId, callback) => {
  request({url: searchId(itemId)}, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      callback(body); 
    } else {
      callback({
        error: 'ERROR'
      });
    }
  });
};

itemIdResult = (body) => {
  return body.items.map((product) => {
    return {
      name: product.name,
      price: product.salePrice,
      itemId: product.itemId,
      description: product.shortDescription,
      thumbnailImage: product.thumbnailImage,
      productUrl: product.productUrl,
      rating: product.customerRating,
      ratingImage: product.customerRatingImage
    };
  });
};

module.exports = {
  searchItemId: searchItemId,
  itemIdResult: itemIdResult 
};

