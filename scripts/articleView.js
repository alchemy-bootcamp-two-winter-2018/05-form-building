'use strict';

const articleView = {};

articleView.populateFilters = () => {

    function filterOptions(article, dataType, filterId) {
        const data = $(article).attr(dataType);

        if ($(`${filterId} option[value="${data}"]`).length === 0) {
            const optionNode = `<option value="${data}">${data}</option>`;
            $(filterId).append(optionNode);
        }
    }

    $('article').each( (index, element) => {
        filterOptions(element, 'data-author', '#author-filter');
        filterOptions(element, 'data-category', '#category-filter');
    });
};

// articleView.handleFilters = () =>

articleView.handleAuthorFilter = () => {
    $('#author-filter').on('change', function () {
        if ($(this).val()) {
            $('article').hide();
            $(`article[data-author="${$(this).val()}"]`).fadeIn();
        } else {
            $('article').fadeIn();
            $('article.template').hide();
        }
        $('#category-filter').val('');
    });
};

articleView.handleCategoryFilter = () => {
    $('#category-filter').on('change', function () {
        if ($(this).val()) {
            $('article').hide();
            $(`article[data-category="${$(this).val()}"]`).fadeIn();
        } else {
            $('article').fadeIn();
            $('article.template').hide();
        }
        $('#author-filter').val('');
    });
};

articleView.handleMainNav = () => {
    $('.main-nav').on('click', '.tab', function () {
        $('.tab-content').hide();
        $(`#${$(this).attr('data-content')}`).fadeIn();
    });

    $('.main-nav .tab:first').click();
};

articleView.setTeasers = () => {
    $('.article-body *:nth-child(n+2)').hide();
    $('article a.show-less').hide();

    $('article').on('click', 'a.read-on', function (e) {
        e.preventDefault();
        $(this).hide();
        $(this).prev().children().show();
        $(this).next().show();
    });

    $('article').on('click', 'a.show-less', function(){
        $(this).hide();
        $(this).prev().show();
        $(this).siblings().children('*:nth-of-type(n+2)').hide();
    });
};

// COMMENT: Where is this function called? Why?
// PUT YOUR RESPONSE HERE
articleView.initIndexPage = () => {
    articleView.populateFilters();
    articleView.handleCategoryFilter();
    articleView.handleAuthorFilter();
    articleView.handleMainNav();
    articleView.setTeasers();
};



// COMMENT: Where is this function called? Why?
// PUT YOUR RESPONSE HERE
articleView.initNewArticlePage = () => {
    // TODO: Ensure the main .tab-content area is revealed. We might add more tabs later or otherwise edit the tab navigation.


    // The new articles we create will be given to the user as JSON so they can copy/paste it into their source data file.
    // STRETCH: Hide the export section for now, and show it once we have data to export.

    $('#article-json').on('focus', function () {
        this.select();
    });

    // TODO: Add an event handler to update the preview (STRETCH: and the export field) if any inputs change.

};

articleView.create = () => {
    // TODO: Set up a variable to hold the new article we are creating.
    // Clear out the #articles element, so we can put in the updated preview


    // TODO: Instantiate an article based on what's in the form fields:


    // TODO: Use our interface to the Handlebars template to put this new article into the DOM:


    // STRETCH: Activate the highlighting of any code blocks; look at the documentation for hljs to see how to do this by placing a callback function in the .each():
    // $('pre code').each();

    // STRETCH: Show our export field, and export the new article as JSON, so it's ready to copy/paste into blogArticles.js:

};
