# [NutriTrack]
## Group [M]: Milestone 2


[ Milestone Report Here ]
We got a lot done this miletsone. We have a good idea of the APIs we need to have implemented and have implemented around 70 - 80% of said endpoints. User authentication is being handled with a token middleware and JWT as we did in lecture. Registration is also fully functional with proper validation on the frontend. The frontend is interacting properly with the backend as well as the database. Information is being populated properly based on the user that is authenticated. The main portion of functionality that is not yet completed is consuming meals and tracking that consumption with visual graphs.

Below is our ER Diagram. Each user has stats that are associated with them. Each user can also possess multiple recipes and consume multiple recipes. 
![](https://github.ncsu.edu/engr-csc342/csc342-2024Spring-GroupM/blob/main/Milestone2/ER_Diagram.png)

Pages | Status | Wireframe
------|--------|---------
Profile | 90% | |
AddRecipe | 100% | [Wireframe](https://github.ncsu.edu/engr-csc342/csc342-2024Spring-GroupM/tree/main/Proposal/Wireframes) |
Login | 100% | [Wireframe](https://github.ncsu.edu/engr-csc342/csc342-2024Spring-GroupM/tree/main/Proposal/Wireframes) |
Register | 100% | 
Dashboard | 70% | [Wireframe](https://github.ncsu.edu/engr-csc342/csc342-2024Spring-GroupM/tree/main/Proposal/Wireframes) |

Method | Route | Description | Working?
-------|-------|-------------|---------
|`post`|`/users/login`|Recieves an email and a password|Yes|
|`post`|`/users`|Creates a new user object|Yes|
|`get`|`/users/:userId`|Retrieves a user given an ID|Yes|
|`post`|`/users/recipes`|Creates a new recipe|Yes|
|`get`|`/users/:userId/recipes`|Retrieves a users' recipes|Yes|
|`get`|`/users/stats/:userId`|Get a users stats/goals|Yes|
|`get`|`/users/stats/:userId`|Get a users stats/goals|Yes|
|`post`|`/users/stats`|Create a new users stats/goals|Yes|
|`put`|`/users/meals`|Update a users' consumed meals|No|


### Team Member Contributions

#### [Yusef]

* Made changes to frontend as necessary
* Worked on creating and testing APIs
* Worked on creating and testing the database
* Worked on getting the frontend to interact with backend

#### [Emanuel]

* Made changes to frontend as necessary
* Worked on creating and testing APIs
* Worked on creating and testing the database
* Worked on getting the frontend to interact with backend

#### [Nour]

* Worked on user authentication

#### Milestone Effort Contribution

Yusef | Eman | Nour
------------- | ------------- | -------------
40%            | 40%            | 20%
