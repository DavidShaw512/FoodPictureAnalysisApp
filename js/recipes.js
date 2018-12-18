// From stup page, pre-modulated::::::::::::::::::::::::::::::::::::::::::::::::

const recipesModule = (function() {

    // Private

    let _render = false;
    
    function _renderRecipe(recipe) {
        return `
            <div class="recipe-card">
                <a href="${recipe.shareAs}" target="_blank"><p class="recipe-name">${recipe.label}</p></a>
            </div>
            `
    }
        
    function _renderRecipeList(recipeList) {
        const recipes = recipeList.map(_renderRecipe);
        return `
            ${recipes.join('')}
            `;
    }

    // Public

    function initiate(mainRender) {
        if (!_render) {
            _render = mainRender;
        }
    }

    function renderRecipesPage(state) {
        const recipeList = _renderRecipeList(state.recipes)
        const recipesPageContent = `
            <div class="recipe-results" id="recipe-results">
                ${recipeList}
            </div>
            `;
    
        const recipePage = commonModule.renderLayout(recipesPageContent);
        $('#root').append(recipePage);
        // handleRetry(state);
    }


    return {
        render: renderRecipesPage,
        initiate
    }

})()
