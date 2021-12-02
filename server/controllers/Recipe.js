const models = require('../models');

const { Recipe } = models;

const loadAll = (req, res) => {
  Recipe.RecipeModel.getAll((err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred!' });
    }

    return res.json({ recipes: docs });
  });
};

const loadOne = (req, res) => {
  Recipe.RecipeModel.findById(req.params.id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred!' });
    }

    return res.render('app', { recipe: JSON.stringify(docs) });
  });
};

module.exports.loadAll = loadAll;
module.exports.loadOne = loadOne;
