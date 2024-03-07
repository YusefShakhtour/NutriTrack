// Code for the API Client Mock

const API_BASE = '/api';

function checkResponse(res) {
    if(!res.ok) {
      throw new Error("There was an error in fetch");
    }
    return res;
}

function handleError(error) {
    console.log("ERROR", error);
    throw error;
}

// get all users
const getUsers = () => {
    return fetch(`${API_BASE}/users`)
      .then(checkResponse)
      .then(res => {
        return res.json();
      })
      .then(users => {
        return users;
      })
      .catch(handleError);
};


// get user by id
const getUsersbyId = (userId) => {
    return fetch(API_BASE+`/users/${userId}`)
    .then(checkResponse)
    .then(res => {
      return res.json();
    })
    .then(user => {
      return user;
    })
    .catch(handleError);
}



// create user
const createUser = (user) => {
    return fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(checkResponse)
    .then(res => {
      return res.json();
    })
    .catch(handleError);
};

// update user
const updateUser = (user) => {
    return fetch(`${API_BASE}/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(checkResponse)
    .then(res => {
      return res.json();
    })
    .catch(handleError);
};

// delete user
const deleteUser = (userId) => {
    return fetch(`${API_BASE}/users/${userId}`, {
      method: 'DELETE'
    })
    .then(checkResponse)
    .then(res => {
      return res.json();
    })
    .catch(handleError);
};

// create recipe
const createRecipe = (recipe) => {
    return fetch(`${API_BASE}/recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipe)
    })
    .then(checkResponse)
    .then(res => {
      return res.json();
    })
    .catch(handleError);
};
// update recipe
const updateRecipe = (recipe) => {
    return fetch(`${API_BASE}/recipes/${recipe.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipe)
    })
    .then(checkResponse)
    .then(res => {
      return res.json();
    })
    .catch(handleError);
};

// get all recipes
const getRecipes = () => {
    return fetch(`${API_BASE}/recipes`)
      .then(checkResponse)
      .then(res => {
        return res.json();
      })
      .then(recipes => {
        return recipes;
      })
      .catch(handleError);
};

// get recipe by id
const getRecipebyId = (recipeId) => {
    return fetch(API_BASE+`/recipes/${recipeId}`)
    .then(checkResponse)
    .then(res => {
      return res.json();
    })
    .then(recipe => {
      return recipe;
    })
    .catch(handleError);
}

// get all recipes for a user
const getRecipesbyUser = (userId) => {
    return fetch(API_BASE+`/users/${userId}/recipes`)
    .then(checkResponse)
    .then(res => {
      return res.json();
    })
    .then(recipes => {
      return recipes;
    })
    .catch(handleError);
}


export default{
    getUsers,
    getUsersbyId,
    createUser,
    updateUser,
    deleteUser,
    createRecipe,
    updateRecipe,
    getRecipes,
    getRecipebyId,
    getRecipesbyUser
}

















































































