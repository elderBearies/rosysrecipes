const models = require ('../models');

const { Recipe } = models;

const recipePage = (req, res) => {
  Recipe.RecipeModel.findById(req.params.id, (err, docs) => {
	 if (err) {
       console.log(err);
	   return res.status(400).json({ error: 'An error occurred!' });
	 }
	 
	 return res.render('app', {csrfToken: req.csrfToken(), recipe: docs });
  });
}

const loadAll = (req, res) => {
  Recipe.RecipeModel.getAll((err, docs) => {
    if (err) {
	  console.log(err);
	  return res.status(400).json({ error: 'An error occurred!' });
	}
	
	return {recipes: docs};
  });
}

module.exports.recipePage = recipePage;
module.exports.loadAll = loadAll;