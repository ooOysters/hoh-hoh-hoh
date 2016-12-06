angular.module('hoh.services', [])

/* Wishlist Factory */
.factory('Wishlist', ($http) => {
  const getAllList = () => $http({
    method: 'GET',
    url: '/api/wishlist',
  })
    .then((resp) => resp.data);

  const addList = (name) => $http({
    method: 'POST',
    url: '/api/wishlist',
    data: { name },
  })
    .then((resp) => resp.data);

  const renameList = (newName, list) => $http({
    method: 'POST',
    url: '/api/wishlist/rename',
    data: { newName, list },
  })
    .then((resp) => resp.data);

  const deleteList = (wishlistId) => $http({
    method: 'POST',
    url: '/api/wishlist/delete',
    data: { wishlistId },
  })
    .then((resp) => resp.data);

  return { addList, getAllList, renameList, deleteList };
})

/* Item Factory */
.factory('Item', ($http) => {
  const getAllItems = ({ id }) => $http({
    method: 'POST',
    url: '/api/item/get',
    data: { id },
  })
    .then((resp) => resp.data);

  const addItemToList = (name, id) => $http({
      method: 'POST',
      url: '/api/item',
      data: { name, id },
    })
      .then((resp) => resp.data);

  const editItem = (name, item) => $http({
    method: 'POST',
    url: '/api/item/rename',
    data: { name, item },
  })
    .then((resp) => resp.data);

  const deleteItemFromList = (itemId) => $http({
    method: 'POST',
    url: '/api/item/delete',
    data: { itemId },
  })
    .then((resp) => resp.data);

  return { getAllItems, addItemToList, editItem, deleteItemFromList };
})

/* Auth Factory */
.factory('Auth', function ($http, $location, $window) {

  const signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  const signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  const isAuth = function () {
    return !!$window.localStorage.getItem('com.hohlife'); //TODO
  };

  const signout = function () {
    $window.localStorage.removeItem('com.hohlife'); //TODO
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
