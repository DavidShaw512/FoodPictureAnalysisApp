// Model the data for the next meeting (figure out what state we need)

// What global data does your app need?

// One giant state object -
// files that have been uploaded (base64 code for the picture)
// Ingredients - array of ingredients
// section: Recipes - array of recipes
// parse data so it looks the way we want it, not the way the api sends it

// will be working with File API

// Whenever an api request is sent, we need to show that something is happening (loading spinner, etc...)
// Loading spinner functionality will be part of the state, also error handling



// Get things moved into modules, get modules running, get everything generating statically (put in api data later)
// Start playing around with the APIs, maybe in postman, maybe using one-off functions
// Commit regularly!



const STORE = {
    currentPage = "upload",
    image = "",
    ingredients = [],
    recipes = [],
}