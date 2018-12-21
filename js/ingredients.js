// From stub page, pre-modulated::::::::::::::::::::::::::::::::::::::::::::::::
// click delete button, find index of item, use the index to delete it from the store
// Get edamam searching for live ingredients
// Get state working instead of STORE on the ingredient deletion/addition (one is finished, the other will look the same)
// Start thinking about design

const ingredientsModule = (function() {
    // Private (private stuff gets underscore, you need to change references accordingly)

    let _render = false;

    
    
    function _renderIngredient(ingredient, index) {
        console.log(index, ingredient);
        return `
            <div class="ingredient" data-index=${index}><p class="ingredient-label">${ingredient}</p><button class="delete-button">X</button>
            </div>
            `;
    }
    
    function _renderIngredientList(ingredientList) {
        const ingredients = ingredientList.map(_renderIngredient);
        return `
            <div class="predictions-box" id="predictions-box">
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

    // Remove an ingredient from the list on the page and from the STORE
    function _handleRemoveIngredient(state) {
        $('.delete-button').click(function(event) {
            event.preventDefault();
            // const ingredientText = $(this).closest('p').innerText;
            // console.log(ingredientText);
            console.log($(this).closest('div')[0].dataset.index);
            const index = $(this).closest('div')[0].dataset.index;
            // const index = STORE.ingredients.indexOf(ingredientText);
            state.ingredients.splice(index, 1);
            // $(this).closest('div').remove();
            _render(state);

        })
    }

    // Add a new ingredient to the list on the page and to the STORE
    function _handleAddIngredient(state) {
        $('#add-ingredient-button').click(function(event) {
            event.preventDefault();
            const newIngredient = $('#add-ingredient').val();
            state.ingredients.push(newIngredient);
            // const newIngredientItem = `
            // <div class="ingredient"><p class="ingredient-label">${newIngredient}</p><button class="delete-button">X</button>
            // </div>
            // `;
            // $('#predictions-box').append(newIngredientItem);
            _render(state);
        })
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
        _handleRemoveIngredient(state);
        _handleAddIngredient(state);
    }

    return {
        render: renderIngredientsPage,
        initiate
    }




})()