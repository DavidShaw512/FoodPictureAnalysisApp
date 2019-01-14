// Begin working module: ***********************************************************

const imageUploadModule = (function() {

    // Private

    let _render = false;

    function _handleUploadClick() {
        $('#upload-icon').click(function () { // on a click on the button with id 'upload-icon'
            $('#file').trigger('click');// trigger a click on the real file upload button 
        })
    }
    
    function _handleFileUploadEvent() {
        $('#file').change(function(f) {
            $('#submit-button').removeClass('hidden');
            let fileName = f.target.files[0].name;
            console.log(fileName);
            $('#file-name-display').append(`File selected: ${fileName}`)
        })
    }
    
    function _handleImageSubmit(state) {
        $('.submit-button').click(function(event) {
            event.preventDefault();
            $('body').addClass('waiting');
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
                    <h1>
                        <span class="fas fa-utensils"></span><br>
                        Foodie
                    </h1>
                </header>
            
                <p  class="body-paragraphs">Get inspired by exciting new recipes based on the food you've got. Just upload a 
                picture of your ingredients!</p>
                <p class="body-paragraphs"><strong>First, upload a picture here:</strong></p>
                <button class="upload-icon" id="upload-icon"><span class="fas fa-camera"></span></button>
                <div class="file-name-display" id="file-name-display"></div>
                <form id="image-upload-form" role="form">
                    <input type="file" id="file" accept="image/*" value="Browse Files" class="file-input"><br>
                    <input type="submit" value="Go!" id="submit-button" class="hidden submit-button button-common">
                </form>
            </div>
            `;
    
        const landingPage = commonModule.renderLayout(landingPageContent);
        $("#root").append(landingPage);
        _handleUploadClick();
        _handleFileUploadEvent();
        _handleImageSubmit(state);
    }
    
    return {
        render: renderLandingPage,
        initiate
    }
    
})();