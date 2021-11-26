const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/login', mid.requiresSecure, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, controllers.Account.login);
  app.get('/recipe', mid.requiresSecure, controllers.Recipe.recipePage);
  app.get('/loadRecipes', controllers.Recipe.loadAll);
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getName', mid.requiresLogin, controllers.Account.getName);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/', mid.requiresSecure, controllers.Recipe.recipePage);
};

module.exports = router;
