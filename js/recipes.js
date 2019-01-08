// From stup page, pre-modulated::::::::::::::::::::::::::::::::::::::::::::::::

const recipesModule = (function() {

    // Private

    let _render = false;
    
    function _renderRecipe(recipe) {
        console.log(recipe.image);
        console.log(recipe.label);
        console.log(recipe.shareAs);
        console.log(recipe.ingredientLines);
        const recipeBulletList = recipe.ingredientLines.join('<li>');
        return `
            <div class="recipe-card">
                <div class="recipe-image" style="background-image: url('${recipe.image}');"></div>
                <div class="recipe-name">
                    <h2>${recipe.label}</h2>
                </div>
                <div class="card-ingredient-list">
                    <h3>You'll need:</h3>
                    <ul>
                        <li>${recipeBulletList}</li>
                    </ul>
                </div>
                <div class="card-actions">
                    <a href="${recipe.shareAs}" target="_blank"><button class="recipe-link-button">Get the recipe!</button></a>
                </div>
            </div>
            `;
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
            window.location.href = '';
            render();
        })
    }

    function _handleNavRestart() {
        $('#nav-restart-button').click(function(event) {
            event.preventDefault();
            window.location.href = '';
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
            <nav class="nav" role="navigation">
                <h2 class="nav-logo">Foodie</h2>
                <div class="nav-restart-button" id="nav-restart-button">&#171; Restart</div>
            </nav>
            <div class="page-container">
                <h1 class="header">Recipes</h1>
                <section class="recipe-results" id="recipe-results" role="region">
                    ${recipeList}
                </section>
                <button class="retry-button" id="retry-button">Retry?</button>
            </div>
            `;
    
        const recipePage = commonModule.renderLayout(recipesPageContent);
        $('#root').append(recipePage);
        _handleRetry();
        _handleNavRestart();
    }


    return {
        render: renderRecipesPage,
        initiate
    }

})()
