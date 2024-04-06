import api from './API_Client_Mock.js';


let recipeList = document.querySelector(".recipeList");

//TODO Change to current user session
api.getCurrentUser().then(user => {
    localStorage.setItem("userId", user.user_id);
    api.getRecipebyId(localStorage.getItem("userId")).then(recipes => {
        for (let i = 0; i < recipes.length; i++) {
            addRecipe(recipes[i]);
        }
    });
});


function addRecipe(recipe) {
    let newRecipe = document.createElement("li");
    newRecipe.innerHTML = recipe.name;
    recipeList.append(newRecipe);
}