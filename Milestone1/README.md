# [NutriTrack]
## Group [M]: Milestone 1


[ Milestone Report]

Currently, our HTML pages are mostly done with the majority of them needing small styling pages to make them look more 
aesthetically pleasing.

Pages | Status | Wireframe
------|--------|---------
Profile | 70% | |
AddRecipe | 80% | [Wireframe](https://github.ncsu.edu/engr-csc342/csc342-2024Spring-GroupM/tree/main/Proposal/Wireframes) |
Login | 90% | [Wireframe](https://github.ncsu.edu/engr-csc342/csc342-2024Spring-GroupM/tree/main/Proposal/Wireframes) |
Dashboard | 50% | [Wireframe](https://github.ncsu.edu/engr-csc342/csc342-2024Spring-GroupM/tree/main/Proposal/Wireframes) |

Roughly 40% of our API routes are functional.

Method | Route | Description | Working?
-------|-------|-------------|---------
|`get`|`/`|||
|`post`|`/login`|Recieves an email and a password|Yes|
|`post`|`/users`|Recieves a user object|Yes|
|`put`|`/users/:userId`|Updates a user given an ID|No|
|`get`|`/users`|Retrieves an array of all users|Yes|
|`get`|`/users/:userId`|Retrieves a user given an ID|Yes|
|`delete`|`/users/:userId`|Deletes a user given an ID|No|
|`post`|`/recipes`|Creates a new recipe|No|
|`put`|`/recipes/:recipeId`|Updates a recipe given an ID|No|
|`get`|`/recipes`|Retrieves all recipes|Yes|
|`get`|`/recipes/:recipeId`|Retrieves a recipe given an ID|Yes|
|`delete`|`/recipes/:recipeId`|Deletes a recipe given an ID|No|
|`get`|`/users/:userId/recipes`|Retrieves a user's recipes|No|


### Team Member Contributions

#### [Yusef]

* HTML/CSS for Login Page
* HTML/CSS for Add Recipe Page
* HTML/CSS for Dashboard Page 
* HTML/CSS for Profile Page

#### [Eman]

* REST API Sketch
* Login and create user functionality (no validation)

#### [Nour]

* API_Client_Mock.js: code for the api client mock  


#### Milestone Effort Contribution

Yusef | Eman | Nour
------------- | ------------- | -------------
33%            | 33%            | 33%
