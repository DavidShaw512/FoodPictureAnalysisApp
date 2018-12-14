// From stub page, pre-modulated::::::::::::::::::::::::::::::::::::::::::::::::

const ingredients = (function() {
    // Private (private stuff gets underscore, you need to change references accordingly)

    let _render = false;

    
    
    function _renderIngredient(ingredient) {
        if (ingredient.probability >= 0.5) {
        return `
            <div class="ingredient">${ingredient.name}<button class="delete-button">X</button>
            </div>
            `;
        };
    }
    
    function _renderIngredientList(ingredientList) {
        const ingredients = ingredientList.map(_renderIngredient);
        return `
            ${ingredients.join("")}
            `;
    }
    
    function _handleConfirmIngredients(state) {
        $('#confirm-ingredients-button').click(function(event) {
            event.preventDefault();
            /* functionality that deals with sending the ingredients to the Edamam API */
            state.currentPage = "recipes";
            render(state);
        });
    }

    // Public

    function initiate(mainRender) {
        if (!_render) {
            _render = mainRender;
        };
    }

    function renderIngredientsPage(state) {
        const ingredientList = renderIngredientList(/* apiFetch.ingredients */)
        const ingredientsPageContent = `
            <p>Is this what was in your picture? If we got it wrong, you can add or delete items...</p>
            <div class="predictions-box">  
                ${ingredientList}
            </div>
            <button class="confirm-ingredients-button">Get some recipes!</button>
            `;
        const ingredientsPage = renderLayout(ingredientsPageContent);
        $('#root').append(ingredientsPage);
        handleConfirmIngredients(state);
    }

    return {
        render: renderIngredientsPage
    }




})()