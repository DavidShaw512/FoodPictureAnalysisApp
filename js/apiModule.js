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

const key = aa1a00e09c97f5eb02a17ec911d35248
const app_id = cf776843
const baseURL = "https://api.edamam.com/search"

function formatIngredientSearch(ingredients) {
    return ingredients.map(item => item.join('+'));
}

function getRecipesFromIngredients(ingredients) {
    const queryString = formatIngredientSearch(ingredients);
    const url = baseURL + "?q=" + queryString + `&app_id=${app_id}&app_key=${key}`;

    fetch(url)
        .then(resultsToJsonIfOk)
        .then(displayResults)
        .catch(error => alert("Error!"));
}





// CLARIFAI API *************************************************************

// API Key:
// 28522d908a1f4246a071174a129026ee

// Base URL:
// https://api.clarifai.com/v2/

// Model ID:
// bd367be194cf45149e75f01d59f77ba7

// Insert for authentication:
// const app = new Clarifai.App({apiKey: 'YOUR_API_KEY'});

app.models.predict("bd367be194cf45149e75f01d59f77ba7", {base64: "nv8wdnack9..."}).then(
    function(response) {
      // do something with response
    },
    function(err) {
      // there was an error
    }
  );
