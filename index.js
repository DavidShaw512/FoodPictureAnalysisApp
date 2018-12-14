// Look over the Edamam and Clarifai APIs, start working out the fetch functions
// for them 

// Common *********************************************
// Will put these in a module -- commonModule = (function() {...})
function renderLayout(children) {
    return `
        <header class="banner">
            <h1>Recipe Finder</h1>
        </header>
        <main role="main">
            <div class="page-container">
                ${children}
            </div>
        </main>
        `
}



// Upload/Landing page module ********************************
// Will put these in a module -- imageModule = (function() {...})
function renderLandingPage(state) {
    const landingPageContent = `
        <p>Upload a picture of the food you've got, and we'll figure out what you can make!</p>
        <form id="image-upload-form" role="form">
            <input type="file" accept="image/*" value="Browse Files">
            <input type="submit" value="Go!" class="submit-button">
        </form>
        `;

    const landingPage = renderLayout(landingPageContent);
    $("#root").append(landingPage);
    handleImageSubmit();
}

function handleImageSubmit(state) {
    $('.submit-button').click(function(event) {
        event.preventDefault();
        /* functionality that deals with sending the picture to the Clarifai API */
        state.currentPage = 'ingredients';
        render(state);
    })
}




// Feedback/Ingredients page module ****************************
// Will put these in a module -- ingredientsModule = (function() {...})
function renderIngredientsPage(state) {
    const ingredientList = renderIngredientList(/* apiFetch.ingredients */)
    const ingredientsPageContent = `
        <p>Is this what was in your picture? If we got it wrong, you can add or delete items...</p>
        ${ingredientList}
        <button class="confirm-ingredients-button">Get some recipes!</button>
        `;
    const ingredientsPage = renderLayout(ingredientsPageContent);
    $('#root').append(ingredientsPage);
    handleConfirmIngredients(state);
}

function renderIngredient(ingredient) {
    if (ingredient.probability >= 0.5) {
    return `
        <div class="ingredient">${ingredient.name}<button class="delete-button">X</button>
        </div>
        `;
    };
}

function renderIngredientList(ingredientList) {
    const ingredients = ingredientList.map(renderIngredient);
    return `
        <div class="predictions-box">
            ${ingredients.join("")}
        </div>
        `;
}

function handleConfirmIngredients(state) {
    $('#confirm-ingredients-button').click(function(event) {
        event.preventDefault();
        /* functionality that deals with sending the ingredients to the Edamam API */
        state.currentPage = "recipes";
        render(state);
    });
}






// Results/Recipes page module ********************************
// Will put these in a module -- recipesModule = (function() {...})
function renderRecipesPage(state) {
    const recipeList = renderRecipeList(state.recipeList)
    const recipesPageContent = `
        <div class="recipe-results" id="recipe-results">
            ${recipeList}
        </div>
        `;

    const recipePage = renderLayout(recipesPageContent);
    $('#root').append(recipePage);
    handleRetry(state);
}

function renderRecipe(recipe) {
    return `
        <div class="recipe-card">
            <a href="${recipe.url}" target="_blank"><p class="recipe-name">${recipe.name}</p></a>
        </div>
        `
}
    
function renderRecipeList(recipeList) {
    const recipes = recipeList.map(renderRecipe);
    return `
        ${recipes.join('')}
        `;
}






function render(state) {
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
}

function main() {
    ingredients.initiate(render);
    
}