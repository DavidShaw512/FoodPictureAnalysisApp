// From stub page, pre-modulated::::::::::::::::::::::::::::::::::::::::::::::::

const ingredientsModule = (function() {
    // Private (private stuff gets underscore, you need to change references accordingly)

    let _render = false;

    
    
    function _renderIngredient(ingredient) {
        // if (ingredient.probability >= 0.5) {
        return `
            <div class="ingredient">${ingredient}<button class="delete-button">X</button>
            </div>
            `;
        // };
    }
    
    function _renderIngredientList(ingredientList) {
        const ingredients = ingredientList.map(_renderIngredient);
        return `
            <div class="predictions-box">
                ${ingredients.join("")}
            </div>
            `;
    }
    
    function _handleConfirmIngredients(state) {
        $('#confirm-ingredients-button').click(function(event) {
            event.preventDefault();
            /* functionality that deals with sending the ingredients to the Edamam API */
            console.log(edamamAPI);
            console.log(edamamAPI.analyzeIngredients);
            edamamAPI.analyzeIngredients()
                .then(response => {
                    console.log(response);
                    state.currentPage = "recipes";
                    render(state);
                });
            // console.log(edamamAPI);
            // state.currentPage = "recipes";
            // render(state);
        });
    }

    // Public

    function initiate(mainRender) {
        if (!_render) {
            _render = mainRender;
        };
    }

    function renderIngredientsPage(state) {
        const ingredientList = _renderIngredientList(state.ingredients/* apiFetch.ingredients */)
        const ingredientsPageContent = `
            <p>Is this what was in your picture? If we got it wrong, you can add or delete items...</p>
            ${ingredientList}
            <form role="form">
                <input type="text" name="add-ingredient" id="add-ingredient" val="Missed any? Add them here!">
                <input type="submit" name="add-ingredient-button" id="add-ingredient-button" val="Add ingredient">
            </form>
            <button class="confirm-ingredients-button" id="confirm-ingredients-button">Get some recipes!</button>
            `;
            
        const ingredientsPage = commonModule.renderLayout(ingredientsPageContent);
        $('#root').append(ingredientsPage);
        _handleConfirmIngredients(state);
    }

    return {
        render: renderIngredientsPage,
        initiate
    }




})()