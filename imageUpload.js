// module pattern
// IIFE === Immediately Invoked Function Expression


// render methods (view layer)
// event handlers (client layer)
// api functions (client layer)
// store modification actions (data layer)


// review previous application
// finish stubbing all methods
// flesh out all render methods and turn static html into dynamically rendered jquery components.


const ingredientModule = (function() { 
  const ingredients = [
    {
      name: 'carrots',
    },
    {
      name: 'brocolli'
    }
  ]


  // Render methods
  function renderIngredientList(ingredients) {
    ingredients.map(renderIngredient).join('');
  }

  function renderIngredient(ingredient) {
    return `
      <div>${ingredient.name}</div>
    `
  }

  function handleSubmit() {
    // function stub
  }

  function getClarifaiResults() {

  }

  function render() {
    const ingredientList = renderIngredientList(ingredients);
    const page = commonModule.mainLayout(ingredientList);
    $('#root').append(page);
  }

  return {
    myPublic,
    render
  }

})();