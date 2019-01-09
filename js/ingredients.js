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
            <section class="predictions-box" id="predictions-box" role="region">
                ${ingredients.join("")}
            </section>
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
        });
    }

    // Remove an ingredient from the list on the page and from the STORE
    function _handleRemoveIngredient(state) {
        $('.delete-button').click(function(event) {
            event.preventDefault();
            console.log($(this).closest('div')[0].dataset.index);
            const index = $(this).closest('div')[0].dataset.index;
            // const index = STORE.ingredients.indexOf(ingredientText);
            state.ingredients.splice(index, 1);
            // $(this).closest('div').remove();
            _render(state);

        })
    }

    // Toggle the visibility of the 'add ingredients' text field
    function _handleToggleAddIngredient() {
        $('#toggle-add-ingredient').click(function(event) {
            event.preventDefault();
            $('#add-ingredients-form').toggleClass('hidden');
        })
    }

    // Add a new ingredient to the list on the page and to the STORE
    function _handleAddIngredient(state) {
        $('#add-ingredient-button').click(function(event) {
            event.preventDefault();
            const newIngredient = $('#add-ingredient').val();
            state.ingredients.push(newIngredient);
            _render(state);
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
        };
    }

    function renderIngredientsPage(state) {
        const ingredientList = _renderIngredientList(state.ingredients/* apiFetch.ingredients */)
        const ingredientsPageContent = `
            <div class="nav" role="navigation">
                <p class="nav-logo">Foodie</p>
                <div class="nav-restart-button" id="nav-restart-button">&#171; Restart</div>
            </div>
            <div class="page-container">
                <h1 class="header">Ingredients</h1>
                <p class="body-paragraphs">Is this what was in your picture? If we got it wrong, you may use this page to add or delete ingredients.</p>
                ${ingredientList}
                <form role="form" id="add-ingredients-form" class="add-ingredients-form hidden">
                    <input type="text" name="add-ingredient" id="add-ingredient" class="add-ingredient-field" val="Missed any? Add them here!">
                    <input type="submit" name="add-ingredient-button" id="add-ingredient-button" class="add-ingredient-button button-common" val="Add ingredient">
                </form>
                <button class="toggle-add-ingredient button-common" id="toggle-add-ingredient">Add Ingredients</button><br>
                <button class="confirm-ingredients-button button-common" id="confirm-ingredients-button">Get some recipes!</button>
            </div>
            `;
            
        const ingredientsPage = commonModule.renderLayout(ingredientsPageContent);
        $('#root').append(ingredientsPage);
        _handleConfirmIngredients(state);
        _handleRemoveIngredient(state);
        _handleToggleAddIngredient();
        _handleAddIngredient(state);
        _handleNavRestart();
    }

    return {
        render: renderIngredientsPage,
        initiate
    }




})()