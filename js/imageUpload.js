// module pattern
// IIFE === Immediately Invoked Function Expression


// render methods (view layer)
// event handlers (client layer)
// api functions (client layer)
// store modification actions (data layer)


// review previous application
// finish stubbing all methods
// flesh out all render methods and turn static html into dynamically rendered jquery components.


// const ingredientModule = (function() { 
//   const ingredients = [
//     {
//       name: 'carrots',
//     },
//     {
//       name: 'brocolli'
//     }
//   ]


//   // Render methods
//   function renderIngredientList(ingredients) {
//     ingredients.map(renderIngredient).join('');
//   }

//   function renderIngredient(ingredient) {
//     return `
//       <div>${ingredient.name}</div>
//     `
//   }

//   function handleSubmit() {
//     // function stub
//   }

//   function getClarifaiResults() {

//   }

//   function render() {
//     const ingredientList = renderIngredientList(ingredients);
//     const page = commonModule.mainLayout(ingredientList);
//     $('#root').append(page);
//   }

//   return {
//     render
//   }

// })();


// Begin working module: ***********************************************************

const imageUploadModule = (function() {

    // Private

    let _render = false;
    
    function _handleImageSubmit(state) {
        $('.submit-button').click(function(event) {
            event.preventDefault();
            /* Trigger file selection */
            const selectedFile = document.getElementById("file").files[0];
            console.log(selectedFile);
            /* turn data into base64 */ 
            const reader = new FileReader();
            reader.onloadend = function() {
                console.log('RESULT', reader.result);
                clarifaiAPI.analyzeImage(reader.result.replace('data:image/jpeg;base64,', ''))
                .then(arrayOfIngredients => {
                    state.ingredients = arrayOfIngredients;
                    // console.log(response); <-- that doesn't work because the 'response' is now 'arrayOfIngredients'
                    /* Store response in the state, use data coming from API to populate the state */
                    state.currentPage = 'ingredients';
                    render(state);
                })

            };
            reader.readAsDataURL(selectedFile);
            /* functionality that deals with sending the picture to the Clarifai API */
            
            
        })
    }

    // Public

    function initiate(mainRender) {
        if (!_render) {
            _render = mainRender;
        };
    }

    function renderLandingPage(state) {
        const landingPageContent = `
            <div class="page-container">
                <header role="banner" class="banner">
                    <h1 class="main-logo">Foodie</h1>
                </header>
            
                <p  class="body-paragraphs">Welcome to Foodie! Use this app to find exciting new recipes you can make using the food you've got! Just upload a 
                picture of your ingredients, and the app will identify and list them. You can manually refine the list if you need to, then 
                submit that list of ingredients to recieve some great recipes that include them!</p>
                <form id="image-upload-form" role="form">
                    <input type="file" id="file" accept="image/*" value="Browse Files" class="file-input"><br>
                    <input type="submit" value="Go!" class="submit-button">
                </form>
            </div>
            `;
    
        const landingPage = commonModule.renderLayout(landingPageContent);
        $("#root").append(landingPage);
        _handleImageSubmit(state);
    }
    
    return {
        render: renderLandingPage,
        initiate
    }
    
})();