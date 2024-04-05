import api from './API_Client_Mock.js';


let recipeList = document.querySelector(".recipeList");

//TODO Change to current user session
let currentUser = 1;
api.getRecipebyId(currentUser).then(recipes => {
    for (let i = 0; i < recipes.length; i++) {
        addRecipe(recipes[i]);
    }
});

function addRecipe(recipe) {
    let newRecipe = document.createElement("li");
    newRecipe.innerHTML = recipe.name;
    recipeList.append(newRecipe);
}