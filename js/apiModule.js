// Here is where the "store" of API data will be. Look over the Edamam and Clarifai APIs and
// begin hashing out all this 


// EDAMAM API ***************************************************************

// Application ID:
// cf776843
// This is the application ID, you should send with each API request.

// API Key:
// aa1a00e09c97f5eb02a17ec911d35248	—
// This is the application key used to authenticate requests.

// Base URL:
// https://api.edamam.com/search

// Sample search URL (check JSON formatting):
// https://api.edamam.com/search?q=zucchini+kale&app_id=cf776843&app_key=aa1a00e09c97f5eb02a17ec911d35248

const key = 'aa1a00e09c97f5eb02a17ec911d35248'
const app_id = 'cf776843'
const baseURL = "https://api.edamam.com/search"

function formatIngredientSearch(state) {
    return state.ingredients.map(item => item.join('+'));
}

function getRecipesFromIngredients(ingredients) {
    const queryString = formatIngredientSearch(ingredients);
    const url = baseURL + "?q=" + queryString + `&app_id=${app_id}&app_key=${key}`;

    fetch(url)
        .then(resultsToJsonIfOk)
        .then(displayResults)
        .catch(error => alert("Error!"));
}
// console.log(STORE.recipes.map(item => item.join("+")));

const edamamAPI = (function() {

  function _extractRecipeData(arrayOfRawRecipes) {
    // Isolate the array of recipes with a const, then populate STORE.recipes by mapping their labels and 'shareAs' urls

    const arrayOfRecipes = arrayOfRawRecipes.hits;
    console.log(arrayOfRecipes);
    arrayOfRecipes.map((item) => console.log(item.recipe.shareAs));
    STORE.recipes = arrayOfRecipes.map((item) => ({
      label: item.recipe.label,
      shareAs: item.recipe.shareAs,
      image: item.recipe.image
    }) );
  }

  const _responseToJson = ((response) => response.json());

  function analyzeIngredients() {
    // Get a string of query items from STORE.ingredients, then push that string into the fetch url
    const queryString = STORE.ingredients.join("+");
    return fetch(`https://api.edamam.com/search?q=${queryString}&app_id=cf776843&app_key=aa1a00e09c97f5eb02a17ec911d35248`)
      .then(_responseToJson)
      .then(responseJson => {
        console.log(responseJson);
        _extractRecipeData(responseJson);
      })

    

  };

  

  

  return {
    analyzeIngredients,
  }
})();





// CLARIFAI API *************************************************************

// API Key:
// 28522d908a1f4246a071174a129026ee

// Base URL:
// https://api.clarifai.com/v2/

// Model ID:
// bd367be194cf45149e75f01d59f77ba7

// Insert for authentication:
// const app = new Clarifai.App({apiKey: 'YOUR_API_KEY'});


  

const clarifaiAPI = (function() {
  const apiKey = '28522d908a1f4246a071174a129026ee'
  const app = new Clarifai.App({apiKey});
  const baseURL = 'https://api.clarifai.com/v2/';
  const foodModelID = 'bd367be194cf45149e75f01d59f77ba7'


  function analyzeImage(base64Image) {
    return app.models.predict(foodModelID, {base64: base64Image})
      .then(extractIngredients)
      .catch(err => {
        console.log(err);
      });

    
      /* Parse all that huge data into desired shape, has properties we want for application */
      /* Assignment for this week: use the stubbed response to start populating the state and make the app look/operate the way we want - do it for Edamam too - get file upload thing going too */

  }
  

  function extractIngredients(arrayOfImageResults) {
    console.log(arrayOfImageResults.outputs[0].data.concepts);

      // Extract the ingredients with const, then populate the STORE by mapping their names

    const fullArray = arrayOfImageResults.outputs[0].data.concepts;
    return fullArray.filter(item => item.value >= 0.85).map(item => item.name);
  }


  return {
    analyzeImage,

  }
})();