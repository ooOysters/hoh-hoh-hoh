const walmartId = process.env.API_KEY;
const wishlistController = require('./wishlist/wishlistController');
const itemController = require('./item/itemController');
const userController = require('./user/userController');
const sessionController = require('./session/sessionController');
const santaController = require('./santa/santaController');
const bodyParser = require('body-parser');
const path = require('path');
const walmart = require('./WalmartApi/apiController');
const walmartSearchId = require('./WalmartApi/itemIdController');
const request = require('request');

module.exports = (app, express) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(userController.middleware.user);
  app.use(express.static(path.join(__dirname, '/../client')));
  app.use(express.static(path.join(__dirname, '/../client/app')));
  app.use(express.static(path.join(__dirname, '/../node_modules')));

  app.get('/api/session', sessionController.sessions.getUser);

  // requests for home page, with auth check
  app.post('/api/users/signin', userController.users.signin);
  app.post('/api/users/signup', userController.users.signup);
  app.post('/api/users/followers', userController.followers.follow);
  app.get('/api/users/following', userController.followers.getFollowing);
  app.get('/api/users/:id', userController.users.getUser);

  app.get('/api/wishlist', wishlistController.wishlists.get);
  app.get('/api/wishlist/:id', wishlistController.wishlists.getByUser);
  app.post('/api/wishlist', wishlistController.wishlists.post);
  app.post('/api/wishlist/rename', wishlistController.wishlists.rename);
  app.post('/api/wishlist/delete', wishlistController.wishlists.delete);

  // requests for items
  app.post('/api/item/get', itemController.items.get);
  app.post('/api/item', itemController.items.post);
  app.post('/api/item/rename', itemController.items.rename);
  app.post('/api/item/delete', itemController.items.delete);


  // requests for secret santa
  app.post('/api/santa/:id', santaController.createRoom);
  app.get('/api/santa/:id', santaController.getRooms);
  app.get('/api/santa/:id/:roomID', santaController.getUsersInRoom);
  app.post('/api/savesanta/:roomID', santaController.saveSantas);

  //Walmart Search Api
  app.post('/api/walmart', (req, res) => {
    walmart.search(req.body.query, (data) => {
      res.json(walmart.modifiedResult(JSON.parse(data)));
    });
  });

  //Walmart itemId Api
  app.post('/api/walmart/itemId', (req, res) => {
    walmartSearchId.searchItemId(req.body.query, (data) => {
      res.json(walmartSearchId.itemIdResult(JSON.parse(data)));
    });
  });

  //storing itemId in a database
  app.post('/api/wishlist/item', itemController.items.postProductId);
  
};
