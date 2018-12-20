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


const edamamAPI = (function() {
  function analyzeIngredients() {
    fetch('https://api.edamam.com/search?q=zucchini+kale+banana&app_id=cf776843&app_key=aa1a00e09c97f5eb02a17ec911d35248')
      .then(responseToJson)
      .then(responseJson => {
        console.log(responseJson);
        extractRecipeData(responseJson);
      })

  };

  const responseToJson = ((response) => response.json());

  function extractRecipeData(arrayOfRawRecipes) {
      // Isolate the array of recipes with a const, then populate STORE.recipes by mapping their labels and 'shareAs' urls

    const arrayOfRecipes = arrayOfRawRecipes.hits;
    console.log(arrayOfRecipes);
    arrayOfRecipes.map((item) => console.log(item.recipe.shareAs));
    arrayOfRecipes.map((item) => STORE.recipes.push({
      label: `${item.recipe.label}`,
      shareAs: `${item.recipe.shareAs}`
    }) );
  }

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

// app.models.predict("bd367be194cf45149e75f01d59f77ba7", {base64: "nv8wdnack9..."}).then(
//     function(response) {
//       // do something with response
//     },
//     function(err) {
//       // there was an error
//     }
//   );
  

const clarifaiAPI = (function() {
  function analyzeImage() {
    return new Promise((resolve, reject) => {
      resolve({"status":{"code":10000,"description":"Ok"},"outputs":[{"id":"850a2bebfbdd470b86235cbf2bf8ba9d","status":{"code":10000,"description":"Ok"},"created_at":"2018-12-17T20:41:01.958030737Z","model":{"id":"bd367be194cf45149e75f01d59f77ba7","name":"food-items-v1.0","created_at":"2016-09-17T22:18:59.955626Z","app_id":"main","output_info":{"type":"concept","type_ext":"concept"},"model_version":{"id":"dfebc169854e429086aceb8368662641","created_at":"2016-09-17T22:18:59.955626Z","status":{"code":21100,"description":"Model trained successfully"},"train_stats":{}},"display_name":"Food"},"input":{"id":"73c1c7d160414ca4a04561c50f66ad76","data":{"image":{"url":"https://clarifai.com/cms-assets/20180320212158/food-002.jpg"}}},"data":{"concepts":[{"id":"ai_G4CCK3Lh","name":"syrup","value":0.9882082,"app_id":"main"},{"id":"ai_Hj7chVRp","name":"waffle","value":0.980306,"app_id":"main"},{"id":"ai_SZLLwK5W","name":"french toast","value":0.9799962,"app_id":"main"},{"id":"ai_bq67BzDJ","name":"toast","value":0.9714266,"app_id":"main"},{"id":"ai_JGRpzN0J","name":"maple syrup","value":0.95655787,"app_id":"main"},{"id":"ai_DlGsqbPZ","name":"chocolate","value":0.9101701,"app_id":"main"},{"id":"ai_f1zKlGnc","name":"coffee","value":0.9053274,"app_id":"main"},{"id":"ai_lVFxwhCj","name":"blueberry","value":0.8945712,"app_id":"main"},{"id":"ai_JXCD9lx9","name":"strawberry","value":0.88745654,"app_id":"main"},{"id":"ai_jmcSl8c1","name":"bacon","value":0.86301565,"app_id":"main"},{"id":"ai_PWmbd19r","name":"cream","value":0.8365375,"app_id":"main"},{"id":"ai_L2Kbb9g3","name":"pancake","value":0.7736388,"app_id":"main"},{"id":"ai_GNdVB8DV","name":"banana","value":0.76668507,"app_id":"main"},{"id":"ai_JQV7LmzG","name":"berry","value":0.7451783,"app_id":"main"},{"id":"ai_321CbfRh","name":"cinnamon","value":0.7193743,"app_id":"main"},{"id":"ai_BQb2KDKr","name":"yogurt","value":0.69929874,"app_id":"main"},{"id":"ai_FnZCSVMH","name":"cheese","value":0.6992636,"app_id":"main"},{"id":"ai_0wh0dJkQ","name":"sweet","value":0.69758344,"app_id":"main"},{"id":"ai_XxrLHmwN","name":"ricotta","value":0.6155825,"app_id":"main"},{"id":"ai_LGL1LmZD","name":"whipped cream","value":0.5566596,"app_id":"main"}]}}]})
    }).then(response => {
      console.log(response);
      extractIngredients(response);
      /* Parse all that huge data into desired shape, has properties we want for application */
      /* Assignment for this week: use the stubbed response to start populating the state and make the app look/operate the way we want - do it for Edamam too - get file upload thing going too */

    })
  }

  function extractIngredients(arrayOfImageResults) {
    console.log(arrayOfImageResults.outputs[0].data.concepts);

      // Extract the ingredients with const, then populate the STORE by mapping their names

    const fullArray = arrayOfImageResults.outputs[0].data.concepts;
    fullArray.map(item => {
      if (item.value >= 0.85) {
      STORE.ingredients.push(`${item.name}`)
      }
    });
  }


  return {
    analyzeImage,

  }
})();