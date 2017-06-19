function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const express = require('express');
const faker = require('faker');
const cache = require('memory-cache');

const router = express.Router();
const CACHE_KEY = 'quote-of-the=-day';

router.get('/', (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    if (!req.session.user) {
      req.session.user = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.image.avatar()
      };
    }

    let sentence = cache.get(CACHE_KEY);
    if (!sentence) {
      sentence = faker.lorem.sentence();
      cache.put(CACHE_KEY, sentence, 20000);
    }

    res.render('index', {
      user: req.session.user,
      sentence
    });
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})());

module.exports = router;