// From stub page, pre-modulated::::::::::::::::::::::::::::::::::::::::::::::::

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
        ${ingredients.join("")}
        `;
}

function handleConfirmIngredients(state) {
    ${'#confirm-ingredients-button'}.click(function(event) {
        event.preventDefault();
        /* functionality that deals with sending the ingredients to the Edamam API */
        state.currentPage = "recipes";
        render(state);
    });
}