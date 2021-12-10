"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var RecipeList = function RecipeList(props) {
  if (props.recipes.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "recipeList"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-header-title is-centered"
    }, "Oops! Recipes aren't loading.")));
  }

  var recipeNodes = props.recipes.map(function (recipe) {
    var recipeUrl = "/recipe/".concat(recipe._id);
    return /*#__PURE__*/React.createElement("div", {
      key: recipe._id,
      className: "card"
    }, /*#__PURE__*/React.createElement("a", {
      className: "card-header-title is-centered",
      href: recipeUrl
    }, recipe.name));
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "recipeList"
  }, recipeNodes));
};

var HomePage = function HomePage() {
  return /*#__PURE__*/React.createElement("div", {
    className: "box"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "title is-1"
  }, "Welcome to Rosy's Recipes!"), /*#__PURE__*/React.createElement("p", {
    className: "intro"
  }, "This site is dedicated to the one and only Rosalie Cooper, my great grandmother. She was one of the most incredible people I've ever had the pleasure of knowing, and her cooking shaped my childhood. I hope that by sharing her recipes here, I can keep my family's culinary legacy around for the next generation."), /*#__PURE__*/React.createElement("p", {
    className: "intro"
  }, "-Ava Feldman"), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("a", {
    className: "button is-info is-small",
    href: "/allRecipes"
  }, "All Recipes")));
};

var FavoriteList = function FavoriteList(props) {
  if (props.recipes.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-header-title is-centered"
    }, "Oops! You don't have any favorites yet!"));
  }

  var index = -1;
  var recipeNodes = props.recipes.map(function (recipe) {
    var recipeUrl = "/recipe/".concat(recipe._id);
    index++;
    return /*#__PURE__*/React.createElement("div", {
      key: recipe._id,
      className: "card"
    }, /*#__PURE__*/React.createElement("a", {
      className: "card-header-title is-centered",
      href: recipeUrl
    }, " ", recipe.name, " "), /*#__PURE__*/React.createElement("div", {
      className: "card-content"
    }, /*#__PURE__*/React.createElement("button", {
      className: "button is-danger is-small",
      "data-toremove": index
    }, "Unfavorite")));
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "favorites"
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

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "box"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "title is-1"
  }, " ", recipe.name, " ")), /*#__PURE__*/React.createElement("div", {
    className: "recipeImg"
  }, " ", /*#__PURE__*/React.createElement("img", {
    src: recipe.img,
    className: "box",
    alt: recipe.name
  }), " "), /*#__PURE__*/React.createElement("section", {
    className: "box"
  }, " ", deChunk(recipe.intro, 'para'), " "), /*#__PURE__*/React.createElement("section", {
    className: "box"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "subtitle is-3"
  }, " Ingredients: "), deChunk(recipe.ingredients, 'ingredient')), /*#__PURE__*/React.createElement("section", {
    className: "box"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "subtitle is-3"
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
    ReactDOM.render( /*#__PURE__*/React.createElement(FavoriteList, {
      recipes: data.account.favorites
    }), document.querySelector('#recipe'));
    var removeButtons = document.querySelectorAll('.removeFave');

    var _iterator = _createForOfIteratorHelper(removeButtons),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var button = _step.value;

        button.onclick = function (e) {
          sendAjax('DELETE', '/removeFavorite', {
            toRemove: e.target.dataset.toremove
          }, function (data) {
            getAcct();
          });
        };
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });
};

var loadPage = function loadPage() {
  var dataStr = document.querySelector('#data').innerHTML;
  var data = dataStr.length > 0 ? JSON.parse(dataStr) : false;
  var favoriteButton = document.querySelector('#favoriteButton');
  favoriteButton.style.display = 'none';

  if (!data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(HomePage, null), document.querySelector('#recipe'));
  } else if (data.name) {
    favoriteButton.style.display = 'inline';

    favoriteButton.onclick = function () {
      sendAjax('POST', '/addFavorite', {
        recipID: data._id
      }, function () {
        favoriteButton.innerHTML = 'Favorited!';
      });
    };

    ReactDOM.render( /*#__PURE__*/React.createElement(Recipe, {
      recipe: data
    }), document.querySelector('#recipe'));
  } else if (data.list) {
    ReactDOM.render( /*#__PURE__*/React.createElement(RecipeList, {
      recipes: []
    }), document.querySelector('#recipe'));
    return loadFromServer();
  } else if (data.faves) {
    ReactDOM.render( /*#__PURE__*/React.createElement(FavoriteList, {
      recipes: []
    }), document.querySelector('#recipe'));
    return getAcct();
  }
};

var setup = function setup() {
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
