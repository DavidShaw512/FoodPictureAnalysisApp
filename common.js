const commonModule = (function() {
  return {
    renderMainLayout: function(children) {
      `<div>${child}</div>`
    }
  }
})()

// From stub page, pre-modulated::::::::::::::::::::::::::::::::::::::::::::::::
function renderLayout(children) {
    return `
        <header class="banner">
            <h1>Recipe Finder</h1>
        </header>
        <main role="main">
            <div class="page-container">
                ${children}
            </div>
        </main>
        `
}


function render(state) {
    $("#root").empty();
    switch(state.currentPage) {
        case 'upload':
            imageModule.renderPage(state);
            console.log("Rendering upload/landing page");
            break;
        case 'ingredients':
            ingredientsModule.renderPage(state);
            console.log("Rendering ingredients/feedback page");
            break;
        case 'recipes':
            recipesModule.renderPage(state);
            console.log("Rendering recipes/results page");
            break;
        default:
            imageModule.renderPage(state);
    };
}