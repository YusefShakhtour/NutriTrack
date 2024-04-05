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

// Login    ***Working
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


// Create user    **Change this  
router.post('/users', (req, res) => {
  let first_name = req.first_name;
  let last_name = req.last_name;
  let username = req.username;
  let unhashed_password = req.password

  let salt = crypto.randomBytes(16).toString('hex');
  
  crypto.pbkdf2(unhashed_password, salt, 100000, 64, 'sha256', (err, derivedKey) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
    let password = derivedKey.toString('hex');
  

  let newUser = {
    first_name: first_name,
    last_name:  last_name,
    username: username,
    password: password,
    salt: salt,
  }

  UserDAO.createUser(newUser).then(user => {
    res.json(user);
  })
    .catch(err => {
      res.status(500).json({ error: 'Internal server error' });
    });
});
});


// Get a specific user  ***Made fix, test again 
router.get('/users/:userId', TokenMiddleware, (req, res) => {
  let userId = req.params.userId;
  let user = UserDAO.getUserById(userId);
  if (user) {
    res.json(user);
  }
  else {
    res.status(500).json({ error: 'Internal server error' });
  }
});


//Logout  **Working
router.post('/users/logout', (req, res) => {
  removeToken(req, res);

  res.json({ success: true });
});

/**
 * RECIPE ENDPOINTS
 */

// Get all recipes for a user given their id  **Working
router.get('/users/:userId/recipes', (req, res) => {
  let userId = req.params.userId;
  RecipeDAO.getRecipesByUserId(userId).then(recipes => {
    res.json(recipes);
  }).catch(err => {
    res.status(500).json({ error: 'Internal server error' });
  });
});

// Get a specific recipe given a recipe id    **Not working
router.get('users/recipes/:rec_id', (req, res) => {
  let rec_id = req.params.rec_id;
  RecipeDAO.getRecipeById(rec_id).then(recipe => {
    res.json(recipe);
  }).catch(err => {
    res.status(500).json({ error: 'Internal server error' });
  });
});

// Create a recipe  **Test Again
router.post('/users/recipes', (req, res) => {
  let name = req.body.name;
  console.log(name);

  let fat = req.body.fat;
  console.log(fat);

  let protein = req.body.protein;
  console.log(protein);

  let carbs = req.body.carbs;
  console.log(carbs);

  let cals = req.body.cals;
  console.log(cals);

  let user_id = req.body.user_id;
  console.log(user_id);


  let recipe = {
    user_id : user_id,
    name : name,
    fat : fat,
    protein : protein,
    carbs : carbs,
    cals : cals
  }
  console.log(recipe);

  
  RecipeDAO.createRecipe(recipe).then(recipe => {
    res.json(recipe);
  }).catch(err => {
    res.status(500).json({ error: 'Internal server error' });
  });
});

/**
 * STATS ENDPOINTS
 */

//Get a users' stats  **Working
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


//Update a users' stats   **Not updating
//Whose stats are being updated? I think we need an id paramter in the url
router.put('/users/stats', (req, res) => {
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