import api from './API_Client_Mock.js';


let recipeList = document.querySelector(".recipeList");
let consumptionList = document.querySelector(".consumptionList");

//TODO Change to current user session
api.getCurrentUser().then(user => {
    localStorage.setItem("userId", user.user_id);
    api.getRecipebyId(localStorage.getItem("userId")).then(recipes => {
        localStorage.setItem("recipes", JSON.stringify(recipes));
        //Loop through all user recipes and add them to frontend
        for (let i = 0; i < recipes.length; i++) {
            addRecipe(recipes[i]);
        }
    });

    //Loop through all user meals and add them to frontend
    api.getDailyMeals(localStorage.getItem("userId")).then(meals => {
        localStorage.setItem("dailyMeals", JSON.stringify(meals));
        console.log(meals);
        console.log(meals.length);

        for (let i = 0; i < meals.length; i++) {
            console.log(meals[i]);
            addMeal(meals[i]);
        }
    });

    api.getWeeklyMeals(localStorage.getItem("userId")).then(meals => {
        localStorage.setItem("weeklyMeals", JSON.stringify(meals));
    });

});

let recItem = document.querySelector(".recItem");
let mealItem = document.querySelector(".mealItem");

// //Add click event listener to everything in recipe container
// recItem.addEventListener('click', function (e) {
//     e.preventDefault();
// });

// //Add click event listener to everything in consumption container
// mealItem.addEventListener('click', function (e) {
//     e.preventDefault();
// });


//Add recipe HTML
function addRecipe(recipe) {
    let newRecipe = document.createElement("li");
    newRecipe.classList.add("recItem");
    newRecipe.innerHTML = recipe.name;
    recipeList.append(newRecipe);
}

function addMeal(meal) {
    let newMeal = document.createElement("li");
    newMeal.classList.add("mealItem");

    // Retrieve recipes from local storage
    const recipesJSON = localStorage.getItem('recipes');

    const recipes = JSON.parse(recipesJSON);
    if (!recipes) {
        return;
    } else {
        recipes.forEach(recipe => {
            if (recipe.rec_id == meal.rec_id) {
                newMeal.innerHTML = recipe.name;
            }
        });
    }
    consumptionList.append(newMeal);
}

/**
 * CHART CREATION
 */

// Pie chart
(async function () {
    const xValues = ["Fat", "Protein", "Carbohydrates"];
    const yValues = [];
    const barColors = ["red", "green", "blue"];

    let totalFat = 0;
    let totalProtein = 0;
    let totalCarbs = 0;

    // Retrieve meals from local storage
    const mealsJSON = localStorage.getItem('weeklyMeals');
    const meals = JSON.parse(mealsJSON);

    // Retrieve recipes from local storage
    const recipesJSON = localStorage.getItem('recipes');
    const recipes = JSON.parse(recipesJSON);

    // Assuming meals and recipes are not null
    meals.forEach(meal => {
        recipes.forEach(recipe => {
            if (meal.rec_id == recipe.rec_id) {
                console.log("hit");
                totalFat += recipe.fat;
                totalProtein += recipe.protein;
                totalCarbs += recipe.carbs;
            }
        });
    });

    yValues.push(totalFat);
    yValues.push(totalProtein);
    yValues.push(totalCarbs);

    new Chart(
        document.getElementById('distribution'),
        {
            type: "pie",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValues
                }]
            },
            options: {
                title: {
                    display: true,
                    text: "Weekly Distribution of Macro-nutrients"
                }
            }
        }
    );
})();
