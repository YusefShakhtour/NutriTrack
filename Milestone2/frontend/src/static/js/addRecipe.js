import api from './API_Client_Mock.js';


let recipeName = document.querySelector("#recipeName");
let fat = document.querySelector("#fat");
let protein = document.querySelector("#protein");
let carbs = document.querySelector("#carbs");
let calories = document.querySelector("#calories");
let addRecipeBtn = document.querySelector("#addRecipeBtn");

//TODO Change to current user session
api.getCurrentUser().then(user => {
    localStorage.setItem("userId", user.user_id);
});


//Posts successfully and adds recipe. But catching a unexpected end of JSON input error
// addRecipeBtn.addEventListener("click", function () {
//     api.createRecipe(recipeName.value, fat.value, protein.value, carbs.value, calories.value, localStorage.getItem("userId")).then(response => {
//         console.log('Recipe created successfully:', response);
//         location.reload();
//     })
//         .catch(err => {
//             console.log("something went wrong" + err);
//         })
// });


// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            addRecipeBtn.addEventListener('click', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                else {
                    api.createRecipe(recipeName.value, fat.value, protein.value, carbs.value, calories.value, localStorage.getItem("userId"))
                        .then(response => {
                            console.log('Recipe created successfully:', response);
                            location.reload();
                        })
                        .catch(err => {
                            console.log("something went wrong" + err);
                        })
                }

                form.classList.add('was-validated')
            }, false)
        })
})()
