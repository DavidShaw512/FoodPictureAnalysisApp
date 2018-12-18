// Look over the Edamam and Clarifai APIs, start working out the fetch functions
// for them 

// Common *********************************************
// Will put these in a module -- commonModule = (function() {...})
// function commonModule.renderLayout(children) {
//     return `
//         <header class="banner">
//             <h1>Recipe Finder App</h1>
//         </header>
//         <main role="main">
//             <div class="page-container">
//                 ${children}
//             </div>
//         </main>
//         `
// }



// // Upload/Landing page module ********************************
// // Will put these in a module -- imageModule = (function() {...})
// function renderLandingPage(state) {
//     const landingPageContent = `
//         <p>Upload a picture of the food you've got, and we'll figure out what you can make!</p>
//         <form id="image-upload-form" role="form">
//             <input type="file" accept="image/*" value="Browse Files">
//             <input type="submit" value="Go!" class="submit-button">
//         </form>
//         `;

//     const landingPage = commonModule.renderLayout(landingPageContent);
//     $("#root").append(landingPage);
//     handleImageSubmit(state);
// }

// function handleImageSubmit(state) {
//     $('.submit-button').click(function(event) {
//         event.preventDefault();
//         /* functionality that deals with sending the picture to the Clarifai API */
//         state.currentPage = 'ingredients';
//         render(state);
//     })
// }




// // Feedback/Ingredients page module ****************************
// // Will put these in a module -- ingredientsModule = (function() {...})
// function renderIngredientsPage(state) {
//     const ingredientList = renderIngredientList(state.ingredients/* apiFetch.ingredients */)
//     const ingredientsPageContent = `
//         <p>Is this what was in your picture? If we got it wrong, you can add or delete items...</p>
//         ${ingredientList}
//         <form role="form">
//             <input type="text" name="add-ingredient" id="add-ingredient" val="Missed any? Add them here!">
//             <input type="submit" name="add-ingredient-button" id="add-ingredient-button" val="Add ingredient">
//         </form>
//         <button class="confirm-ingredients-button" id="confirm-ingredients-button">Get some recipes!</button>
//         `;
        
//     const ingredientsPage = commonModule.renderLayout(ingredientsPageContent);
//     $('#root').append(ingredientsPage);
//     handleConfirmIngredients(state);
// }

// function renderIngredient(ingredient) {
//     // if (ingredient.probability >= 0.5) {
//     return `
//         <div class="ingredient">${ingredient}<button class="delete-button">X</button>
//         </div>
//         `;
//     // };
// }

// function renderIngredientList(ingredientList) {
//     const ingredients = ingredientList.map(renderIngredient);
//     return `
//         <div class="predictions-box">
//             ${ingredients.join("")}
//         </div>
//         `;
// }

// function handleConfirmIngredients(state) {
//     $('#confirm-ingredients-button').click(function(event) {
//         event.preventDefault();
//         /* functionality that deals with sending the ingredients to the Edamam API */
//         state.currentPage = "recipes";
//         render(state);
//     });
// }

// function handleDeleteIngredient() {
//     $(".delete-button").click(function(event) {
//         event.preventDefault();
//         console.log("Delete button clicked");
//         $(this).closest("div").remove();
//     });
// }






// // Results/Recipes page module ********************************
// // Will put these in a module -- recipesModule = (function() {...})
// function renderRecipesPage(state) {
//     const recipeList = renderRecipeList(state.recipes)
//     const recipesPageContent = `
//         <div class="recipe-results" id="recipe-results">
//             ${recipeList}
//         </div>
//         `;

//     const recipePage = commonModule.renderLayout(recipesPageContent);
//     $('#root').append(recipePage);
//     handleRetry(state);
// }

// function renderRecipe(recipe) {
//     return `
//         <div class="recipe-card">
//             <a href="${recipe.shareAs}" target="_blank"><p class="recipe-name">${recipe.label}</p></a>
//         </div>
//         `
// }
    
// function renderRecipeList(recipeList) {
//     const recipes = recipeList.map(renderRecipe);
//     return `
//         ${recipes.join('')}
//         `;
// }








function render(currentState) {
    $("#root").empty();
    switch(currentState.currentPage) {
        case 'upload':
            imageUploadModule.render(currentState);
            console.log("Rendering upload/landing page");
            console.log(currentState);
            break;
        case 'ingredients':
            ingredientsModule.render(currentState);
            console.log("Rendering ingredients/feedback page");
            break;
        case 'recipes':
            recipesModule.render(currentState);
            console.log("Rendering recipes/results page");
            break;
        default:
            imageUploadModule.render(currentState);
    };
}


function main() {
    imageUploadModule.initiate(render);
    ingredientsModule.initiate(render);
    recipesModule.initiate(render);
    render(STORE);
}


$(function() {
    main();
    // console.log("Loaded up!");
    // render(STORE);
    // handleDeleteIngredient();

});

    
// function render(currentState) {
    // $("#root").empty();
    // switch(state.currentPage) {
    //     case 'upload':
    //         imageModule.renderPage(state);
    //         console.log("Rendering upload/landing page");
    //         break;
    //     case 'ingredients':
    //         ingredientsModule.renderPage(state);
    //         console.log("Rendering ingredients/feedback page");
    //         break;
    //     case 'recipes':
    //         recipesModule.renderPage(state);
    //         console.log("Rendering recipes/results page");
    //         break;
    //     default:
    //         imageModule.renderPage(state);
    // };




