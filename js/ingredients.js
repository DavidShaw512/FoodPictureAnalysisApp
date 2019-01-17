const ingredientsModule = (function () {
    // Private

    let _render = false;



    function _renderIngredient(ingredient, index) {
        return `
            <div class="ingredient" data-index=${index}>
                <p class="ingredient-label">
                    ${ingredient}
                </p>
                <button class="delete-button">
                    <span class="fas fa-times"></span>
                </button>
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
        $('#confirm-ingredients-button').click(function (event) {
            event.preventDefault();
            /* change the text in the 'Get some recipes' button to a spinning carrot icon to indicate loading */
            $('#confirm-ingredients-button').html('<span class="fas fa-carrot loader"></span>');
            $('#confirm-ingredients-button').css({
                'padding': '14px 105px',
                'transition': '0s'
            })
            $('body').addClass('waiting');
            /* functionality that deals with sending the ingredients to the Edamam API */
            edamamAPI.analyzeIngredients()
                .then(response => {
                    state.currentPage = "recipes";
                    render(state);
                });
        });
    }

    // Remove an ingredient from the list on the page and from the STORE
    function _handleRemoveIngredient(state) {
        $('.delete-button').click(function (event) {
            event.preventDefault();
            const index = $(this).closest('div')[0].dataset.index;
            state.ingredients.splice(index, 1);
            _render(state);

        })
    }

    // Toggle the visibility of the 'add ingredients' text field
    function _handleToggleAddIngredient() {
        $('#toggle-add-ingredient').click(function (event) {
            event.preventDefault();
            $('#add-ingredients-form').removeClass('hidden');
            $('#toggle-add-ingredient').addClass('grey-out');
        })
    }

    // Add a new ingredient to the list on the page and to the STORE
    function _handleAddIngredient(state) {
        if ($('.add-ingredient').val() !== '') {
            $('#add-ingredient-button').click(function (event) {
                event.preventDefault();
                const newIngredient = $('#add-ingredient').val();
                state.ingredients.push(newIngredient);
                _render(state);
            })
        }
    }

    function _handleNavRestart() {
        $('#nav-restart-button').click(function (event) {
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
            <nav class="nav" role="navigation">
                <p class="nav-logo">Foodie &nbsp;<span class="fas fa-utensils"></span></p>
                <div class="nav-restart-button" id="nav-restart-button"><span class="fas fa-undo"></span> Restart</div>
            </nav>
            <section class="page-container">
                <h1 class="header">Ingredients</h1>
                <p class="body-paragraphs">Is this what was in your picture? If we got it wrong, you may use this page to add or delete ingredients.</p>
                ${ingredientList}
                <form role="form" id="add-ingredients-form" class="add-ingredients-form hidden">
                    <input type="text" name="add-ingredient" id="add-ingredient" class="add-ingredient-field" placeholder="Add another ingredient">
                    <button type="submit" name="add-ingredient-button" id="add-ingredient-button" class="add-ingredient-button button-common">
                        <span class="fas fa-check"></span>
                    </button>
                </form>
                <button class="toggle-add-ingredient" id="toggle-add-ingredient">Add Ingredients</button><br>
                <button class="confirm-ingredients-button button-common" id="confirm-ingredients-button">Get some recipes!</button>
            </section>
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