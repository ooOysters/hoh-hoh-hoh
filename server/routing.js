var bodyParser = require('body-parser');
var path = require('path');
var wishlistController = require('./wishlist/wishlistController');
var itemController = require('./item/itemController');

module.exports = function (app, express) {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, '/../client')));
  app.use(express.static(path.join(__dirname, '/../client/app')));
  app.use(express.static(path.join(__dirname, '/../node_modules')));

  //requests for wishlists
  app.get('/api/wishlist', wishlistController.wishlists.get);
  app.post('/api/wishlist', wishlistController.wishlists.post);
  app.post('/api/wishlist/rename', wishlistController.wishlists.rename);
  app.delete('/api/wishlist', wishlistController.wishlists.delete);
  // //requests for items
  app.post('/api/item/get', itemController.items.get);
  app.post('/api/item', itemController.items.post);
  app.post('/api/item/rename', itemController.items.rename);
  app.delete('/api/item', itemController.items.delete);
};
