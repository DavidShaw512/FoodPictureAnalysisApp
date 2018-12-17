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
    render
  }

})();


// Begin working module: ***********************************************************

const imageUploadModule = (function() {

    // Private

    let _render = false;
    
    function _handleImageSubmit(state) {
        $('.submit-button').click(function(event) {
            event.preventDefault();
            /* functionality that deals with sending the picture to the Clarifai API */
            state.currentPage = 'ingredients';
            render(state);
        })
    }

    // Public

    function initiate(mainRender) {
        if (!_render) {
            _render = mainRender;
        }
    }

    function renderLandingPage(state) {
        const landingPageContent = `
            <p>Upload a picture of the food you've got, and we'll figure out what you can make!</p>
            <form id="image-upload-form" role="form">
                <input type="file" accept="image/*" value="Browse Files">
                <input type="submit" value="Go!" class="submit-button">
            </form>
            `;
    
        const landingPage = renderLayout(landingPageContent);
        $("#root").append(landingPage);
        _handleImageSubmit(state);
    }
    
    return {
        render: renderLandingPage
    }
    
})();