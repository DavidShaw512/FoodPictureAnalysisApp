const commonModule = (function() {

    function renderLayout(children) {
        return `
            <header class="banner">
                <h1>Recipe Finder App</h1>
            </header>
            <main role="main">
                <div class="page-container">
                    ${children}
                </div>
            </main>
            `
    }

    return {
        renderLayout
    }
})();
