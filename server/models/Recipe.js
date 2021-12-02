const mongoose = require('mongoose');

let RecipeModel = {};

const convertId = mongoose.Types.ObjectId;

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  img: {
    type: String,
    required: true,
  },

  intro: {
    type: Array,
    required: true,
  },

  ingredients: {
    type: Array,
    required: true,
  },

  procedure: {
    type: Array,
    required: true,
  },
});

RecipeSchema.statics.toAPI = (doc) => ({
  _id: doc._id,
  name: doc.name,
  img: doc.img,
  intro: doc.intro,
  ingredients: doc.ingredients,
  procedure: doc.procedure,
});

RecipeSchema.statics.findById = (id, callback) => {
  const search = {
    _id: convertId(id),
  };

  return RecipeModel.findOne(search, callback);
};

RecipeSchema.statics.getAll = (callback) => RecipeModel.find().lean().exec(callback);

RecipeModel = mongoose.model('Recipe', RecipeSchema);

module.exports.RecipeModel = RecipeModel;
module.exports.RecipeSchema = RecipeSchema;
