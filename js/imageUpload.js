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
            
                <p  class="body-paragraphs">Find exciting new recipes you can make using the food you've got. Just upload a 
                picture of your ingredients!</p>
                <form id="image-upload-form" role="form">
                    <input type="file" id="file" accept="image/*" value="Browse Files" class="file-input"><br>
                    <input type="submit" value="Go!" class="submit-button button-common">
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