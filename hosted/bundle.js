"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var currentUser;

var RecipeList = function RecipeList(props) {
  if (props.recipes.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "recipeList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyrecipe"
    }, "Oops! I haven't put recipes here yet!"));
  }

  var recipeNodes = props.recipes.map(function (recipe) {
    var recipeUrl = "/recipe/".concat(recipe._id);
    return /*#__PURE__*/React.createElement("div", {
      key: recipe._id,
      className: "recipe"
    }, /*#__PURE__*/React.createElement("a", {
      href: recipeUrl
    }, " ", recipe.name, " "));
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "recipeList"
  }, recipeNodes));
};

var Recipe = function Recipe(props) {
  var recipe = props.recipe;
  var key = 0;

  var deChunk = function deChunk(chunk, tag) {
    var comp = chunk.map(function (para) {
      return /*#__PURE__*/React.createElement("p", {
        key: key++,
        className: tag
      }, para);
    });
    return comp;
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", {
    className: "title"
  }, " ", recipe.name, " "), /*#__PURE__*/React.createElement("img", {
    src: recipe.img,
    alt: recipe.name
  }), /*#__PURE__*/React.createElement("section", {
    className: "intro"
  }, " ", deChunk(recipe.intro, 'para'), " "), /*#__PURE__*/React.createElement("section", {
    className: "ingredients"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "subTitle"
  }, " Ingredients: "), deChunk(recipe.ingredients, 'ingredient')), /*#__PURE__*/React.createElement("section", {
    className: "procedure"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "subTitle"
  }, " Procedure: "), deChunk(recipe.procedure, 'step')));
};

var loadFromServer = function loadFromServer() {
  sendAjax('GET', '/loadRecipes', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(RecipeList, {
      recipes: data.recipes
    }), document.querySelector('#recipe'));
  });
};

var getAcct = function getAcct() {
  sendAjax('GET', '/getName', null, function (data) {
    currentUser = _objectSpread({}, data.account);
    name = data.account.name;
  });
};

var loadPage = function loadPage() {
  var dataStr = document.querySelector('#data').innerHTML;
  var data = dataStr.length > 0 ? JSON.parse(dataStr) : false;
  console.log(data);

  if (!data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(RecipeList, {
      recipes: []
    }), document.querySelector('#recipe'));
    return loadFromServer();
  } else if (data.name) {
    ReactDOM.render( /*#__PURE__*/React.createElement(Recipe, {
      recipe: data
    }), document.querySelector('#recipe'));
  } else if (data.home) {
    console.log('home page!');
  }
};

var setup = function setup() {
  getAcct();
  loadPage();
};

$(document).ready(function () {
  setup();
});
"use strict";

var handleError = function handleError(message) {
  $('#errorMessage').text(message);
};

var redirect = function redirect(response) {
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: 'json',
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
