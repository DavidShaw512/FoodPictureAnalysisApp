

function render(currentState) {
    $("#root").empty();
    switch(currentState.currentPage) {
        case 'upload':
            imageUploadModule.render(currentState);
            console.log("Rendering upload/landing page");
            console.log(currentState);
            break;
        case 'ingredients':
            ingredientsModule.render(currentState);
            console.log("Rendering ingredients/feedback page");
            break;
        case 'recipes':
            recipesModule.render(currentState);
            console.log("Rendering recipes/results page");
            break;
        default:
            imageUploadModule.render(currentState);
    };
}


function main() {
    imageUploadModule.initiate(render);
    ingredientsModule.initiate(render);
    recipesModule.initiate(render);
    render(STORE);
}


$(function() {
    main();
    console.log("Loaded up!");
    // render(STORE);
    // handleDeleteIngredient();

});


