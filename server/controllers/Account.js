const models = require('../models');

const { Account } = models;
const { Recipe } = models;

const loginPage = (req, res) => {
  res.render('login');
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const login = (request, response) => {
  const req = request;
  const res = response;

  // cast to strings to cover up some security flaws
  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

  if (!username || !password) {
    return res.status(400).json({ error: 'Please fill out all fields!' });
  }

  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password!' });
    }

    req.session.account = Account.AccountModel.toAPI(account);

    return res.json({ redirect: '/' });
  });
};

const signup = (request, response) => {
  const req = request;
  const res = response;

  // cast to strings to cover up some security flaws
  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;
  req.body.name = `${req.body.name}`;

  if (!req.body.username || !req.body.name || !req.body.pass || !req.body.pass2) {
    return res.status(400).json({ error: 'Please fill out all fields!' });
  }

  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({ error: 'Passwords don\'t match!' });
  }

  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      name: req.body.name,
      salt,
      password: hash,
    };

    const newAccount = new Account.AccountModel(accountData);

    const savePromise = newAccount.save();

    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      res.json({ redirect: '/' });
    });

    savePromise.catch((err) => {
      console.log(err);

      if (err.code === 11000) {
        return res.status(400).json({ error: 'Username is already in use!' });
      }

      return res.status(400).json({ error: 'Something went wrong!' });
    });
  });
};

const getName = (request, response) => {
  const req = request;
  const res = response;

  return Account.AccountModel.findByUsername(req.session.account.username, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured!' });
    }

    return res.json({ account: docs });
  });
};

const addFavorite = (request, response) => {
  const req = request;
  const res = response;
  const { recipID } = req.body;
  return Account.AccountModel.findByUsername(req.session.account.username, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured!' });
    }
    const acct = docs;
    return Recipe.RecipeModel.findById(recipID, (er, doc) => {
      if (er) {
        console.log(er);
        return res.status(400).json({ error: 'An error occured!' });
      }
      if (!acct.favorites.reduce((count, curr) => {
        let nCount = count;
        if (curr.name === doc.name) nCount += 1;
        return nCount;
      }, 0)) {
        acct.favorites.push({ _id: doc._id, name: doc.name });
        acct.save();
      }
      return res.status(204).json({ msg: 'Success!' });
    });
  });
};

const removeFavorite = (request, response) => {
  const req = request;
  const res = response;
  const toRemove = parseInt(req.body.toRemove, 10);
  return Account.AccountModel.findByUsername(req.session.account.username, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured!' });
    }
    const acct = docs;
    const outputArr = [];
    for (let i = 0; i < acct.favorites.length; i++) {
      if (i !== toRemove) outputArr.push(acct.favorites[i]);
    }
    acct.favorites = outputArr;
    acct.save();
    return res.status(204).json({ msg: 'Success!' });
  });
};

module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signup = signup;
module.exports.getName = getName;
module.exports.addFavorite = addFavorite;
module.exports.removeFavorite = removeFavorite;
