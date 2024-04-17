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
            // console.log(meals[i]);
            addMeal(meals[i]);
        }
    });

    api.getWeeklyMeals(localStorage.getItem("userId")).then(meals => {
        localStorage.setItem("weeklyMeals", JSON.stringify(meals));
    });

});

let recItem = document.querySelectorAll(".recItem");
let mealItem = document.querySelector(".mealItem");
// console.log("RecItems: " + recItem[0]);

// //Add click event listener to everything in recipe container
// recItem.addEventListener('click', function (e) {
//     e.preventDefault();
// });

// //Add click event listener to everything in consumption container
// mealItem.addEventListener('click', function (e) {
//     e.preventDefault();
// });


let recContainer = document.querySelector(".recContainer");
recContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("recItem")) {
        console.log("click");
        let recipes = JSON.parse(localStorage.getItem("recipes"));
        recipes.forEach(recipe => {
            console.log("RecipeName: " + recipe.name);
            console.log("InnerHTML: " + e.target.innerHTML);
            if (recipe.name == e.target.innerHTML) {
                console.log("Found recipe");
                console.log("Creating Meal");
                api.createMeal(localStorage.getItem("userId"), formatDate(), recipe.rec_id);
                window.location.reload();
            }
        });
    }
});


//Add recipe HTML
function addRecipe(recipe) {
    let newRecipe = document.createElement("li");
    newRecipe.classList.add("recItem");
    newRecipe.innerHTML = recipe.name;
    recipeList.append(newRecipe);
}

function formatDate() {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    let day = ('0' + currentDate.getDate()).slice(-2);
    let formattedDate = year + '-' + month + '-' + day;
    return formattedDate;
}

function formatDatePrevious(daysPast) {
    let currentDate = new Date();
    currentDate.setHours(currentDate.getHours() - 24 * daysPast);
    let year = currentDate.getFullYear();
    let month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    let day = ('0' + currentDate.getDate()).slice(-2);
    let formattedDate = year + '-' + month + '-' + day;
    return formattedDate;
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

// when one of the meals is clicked, it will be deleted

consumptionList.addEventListener('click', function (e) {
    let meal = e.target;
    let mealName = meal.innerHTML;

    // Retrieve meals from local storage
    const mealsJSON = localStorage.getItem('dailyMeals');
    const meals = JSON.parse(mealsJSON);

    meals.forEach(meal => {
        // console.log(meal);
        // console.log(mealName);
        if (mealName == meal.name) {
            // console.log(meal.meals_id);
            api.deleteMeal(meal.meals_id).then(() => {
                meal.remove();
            });
        }
    });
});



/**
 * CHART CREATION
 */
// Pie chart
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



// Stats
const fat_goal = [];
const protein_goal = [];
const carb_goal = [];
await api.getUserStats(localStorage.getItem("userId")).then(stats => {
    for (let x = 0; x < 7; x++) {
        fat_goal.push(stats[0].fat_goal);
        protein_goal.push(stats[0].protein_goal);
        carb_goal.push(stats[0].carb_goal);
    }
});

// Fat chart
const L7fat = [];
let daysFat = 0;

for (let x = 0; x < 7; x++) {
    meals.forEach(meal => {
        // console.log(formatDatePrevious(x));
        // console.log(meal.date);
        if (meal.date == formatDatePrevious(x)) {
            // console.log("Meal Date: " + meal.date);
            recipes.forEach(recipe => {
                if (meal.rec_id == recipe.rec_id) {
                    // console.log("Recipe Fat: " + recipe.fat);
                    daysFat += recipe.fat;
                }
            });
        }
    });
    L7fat.push(daysFat);
    daysFat = 0;
}



// Protein chart
const L7protein = [];
let daysProtein = 0;

for (let i = 0; i < 7; i++) {
    meals.forEach(meal => {
        if (meal.date == formatDatePrevious(i)) {
            recipes.forEach(recipe => {
                if (meal.rec_id == recipe.rec_id) {
                    daysProtein += recipe.protein
                }
            });
        }
    });
    L7protein.push(daysProtein);
    daysProtein = 0;
}
