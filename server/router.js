const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.get('/recipe/:id', (req, res) => controllers.Recipe.loadOne(req, res, req.params.id));
  app.get('/loadRecipes', controllers.Recipe.loadAll);
  app.get('/getName', mid.requiresLogin, controllers.Account.getName);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.post('/addFavorite', mid.requiresLogin, controllers.Account.addFavorite);
  app.delete('/removeFavorite', mid.requiresLogin, controllers.Account.removeFavorite);
  app.get('/allRecipes', (req, res) => res.render('app', { data: JSON.stringify({ list: true }) }));
  app.get('/favorites', mid.requiresLogin, (req, res) => res.render('app', { data: JSON.stringify({ faves: true }) }));
  app.get('/', (req, res) => res.render('app'));
};

module.exports = router;
