const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/login', mid.requiresSecure, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, controllers.Account.login);
  app.get('/recipe/:id', (req, res) => controllers.Recipe.loadOne(req, res, req.params.id));
  app.get('/loadRecipes', controllers.Recipe.loadAll);
  app.get('/getName', mid.requiresLogin, controllers.Account.getName);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/', (req, res) => res.render('app'));
};

module.exports = router;
