// From stup page, pre-modulated::::::::::::::::::::::::::::::::::::::::::::::::

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
            <a href="${recipe.shareAs}" target="_blank"><p class="recipe-label">${recipe.label}</p></a>
        </div>
        `
}
    
function renderRecipeList(recipeList) {
    const recipes = recipeList.map(renderRecipe);
    return `
        ${recipes.join('')}
        `;
}