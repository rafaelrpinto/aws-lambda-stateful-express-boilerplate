const express = require('express');
const faker = require('faker');
const cache = require('memory-cache');

const router = express.Router();
const CACHE_KEY = 'quote-of-the-day';

router.get('/', (req, res) => {
  if (!req.session.user) {
    // initializes the user with random data
    req.session.user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      avatar: faker.image.avatar(),
    };
  }

  let sentence = cache.get(CACHE_KEY);
  if (!sentence) {
    // cached a shared sentence for all users
    sentence = faker.lorem.sentence();
    cache.put(CACHE_KEY, sentence, 20000);
  }

  res.render('index', {
    user: req.session.user,
    sentence,
  });
});

router.post('/doPost', (req, res) => {
  // test for csrf token validation on posts
  res.status(200).json('OK');
});

module.exports = router;
