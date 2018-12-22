// From stup page, pre-modulated::::::::::::::::::::::::::::::::::::::::::::::::

const recipesModule = (function() {

    // Private

    let _render = false;
    
    function _renderRecipe(recipe) {
        console.log(recipe.image);
        console.log(recipe.label);
        console.log(recipe.shareAs);
        return `
            <div class="recipe-card">
                <img class="recipe-image" src="${recipe.image}">
                <p class="recipe-name">${recipe.label}</p>
                <a href="${recipe.shareAs}" target="_blank">Get the recipe!</a>
            </div>
            `
    }
        
    function _renderRecipeList(recipeList) {
        console.log(recipeList.length);
        const noRecipes = recipeList.length === 0;
        return noRecipes ?
            `<p class="no-recipes-message">We couldn\'t find any recipes using those ingredients, try again!</p>`
            :
            `${recipeList.map(_renderRecipe).join('')}`
    }

    function _handleRetry() {
        $('#retry-button').click(function(event) {
            event.preventDefault();
            window.location.href = "";
            render();
        })
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
            <button class="retry-button" id="retry-button">Retry?</button>
            `;
    
        const recipePage = commonModule.renderLayout(recipesPageContent);
        $('#root').append(recipePage);
        _handleRetry();
    }


    return {
        render: renderRecipesPage,
        initiate
    }

})()
