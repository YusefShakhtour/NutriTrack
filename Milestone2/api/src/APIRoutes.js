const router = require('express').Router();
const crypto = require('crypto');
const cookieParser = require('cookie-parser');

const RecipeDAO = require('./db/RecipeDAO');
const UserDAO = require('./db/UserDAO');
const StatsDAO = require('./db/StatsDAO');
router.use(cookieParser());

const { TokenMiddleware, generateToken, removeToken } = require('./middleware/TokenMiddleware');


// Default
router.get('/', (req, res) => {
  res.json({ your_api: 'it works' });
});

/**
 * USER ENDPOINTS
 */

// Login
router.post('/users/login', (req, res) => {
  if (req.body.username && req.body.password) {
    UserDAO.getUserByCredentials(req.body.username, req.body.password).then(user => {
      let result = {
        user: user
      }

      generateToken(req, res, user);

      res.json(result);
    }).catch(err => {
      console.log(err);
      res.status(err.code).json({ error: err.message });
    });
  }
  else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});


// Create user
router.post('/users', (req, res) => {
  let newUser = req.body;
  UserDAO.createUser(newUser).then(user => {
    res.json(user);
  })
    .catch(err => {
      res.status(500).json({ error: 'Internal server error' });
    });
});


// Get a specific user
router.get('/users/:userId', TokenMiddleware, (req, res) => {
  let user = UserDAO.getUserById(userId);
  if (user) {
    res.json(user);
  }
  else {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/users/logout', (req, res) => {
  removeToken(req, res);

  res.json({ success: true });
});

/**
 * RECIPE ENDPOINTS
 */

// Get all recipes for a user given their id
router.get('/users/:userId/recipes', (req, res) => {
  let userId = req.params.userId;
  RecipeDAO.getRecipesByUserId(userId).then(recipes => {
    res.json(recipes);
  }).catch(err => {
    res.status(500).json({ error: 'Internal server error' });
  });
});

// Get a specific recipe given a recipe id
router.get('users/recipes/:recipeId', (req, res) => {
  let recipeId = req.params.recipeId;
  RecipeDAO.getRecipeById(recipeId).then(recipe => {
    res.json(recipe);
  }).catch(err => {
    res.status(500).json({ error: 'Internal server error' });
  });
});

// Create a recipe
router.post('/users/recipes', (req, res) => {
  let newRecipe = req.body;
  RecipeDAO.createRecipe(newRecipe).then(recipe => {
    res.json(newRecipe);
  }).catch(err => {
    res.status(500).json({ error: 'Internal server error' });
  });
});

/**
 * STATS ENDPOINTS
 */

//Get a users' stats
router.get('/users/stats/:userId', (req, res) => {
  let userId = req.params.userId;
  StatsDAO.getStatsByUserId(userId).then(stats => {
    res.json(stats);
  }).catch(err => {
    res.status(500).json({ error: 'Internal server error' });
  });
});

//Create user stats
router.post('/user/stats', (req, res) => {
  let stats = req.body;
  StatsDAO.createStats(stats).then(stats => {
    res.json(stats);
  }).catch(err => {
    res.status(500).json({ error: 'Internal server error' });
  });
});


//Update a users' stats
router.put('/user/stats', (req, res) => {
  let stats = req.body;
  StatsDAO.updateStats(stats).then(stats => {
    res.json(stats);
  }).catch(err => {
    res.status(500).json({ error: 'Internal server error' });
  })
})


/**
 * MEAL ENDPOINTS
 */

// TODO: Implement meal endpoints

module.exports = router;