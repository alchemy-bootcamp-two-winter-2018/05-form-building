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

articleView.handleFilters = (filterType, otherType) => {

    $(`#${filterType}-filter`).on('change', function () {
        if ($(this).val()) {
            $('article').hide();
            $(`article[data-${filterType}="${$(this).val()}"]`).fadeIn();
        } else {
            $('article').fadeIn();
            $('article.template').hide();
        }
        $(`#${otherType}-filter`).val('');
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
// This function is called on the index.html page to initialize the javascript functions specific to that page.  This allows us to differentiate where and when our methods are being called, though they may originate from the same object and/or file source.
articleView.initIndexPage = () => {
    articleView.populateFilters();
    articleView.handleFilters('category', 'author');
    articleView.handleFilters('author', 'category');
    articleView.handleMainNav();
    articleView.setTeasers();
};

// COMMENT: Where is this function called? Why?
// This function is called on new.html to allow us to call a different set of javascript functions there, perhaps with different arguments, or in a different order, though they have originated from the same object and file.
articleView.initNewArticlePage = () => {
    // TODOne: Ensure the main .tab-content area is revealed. We might add more tabs later or otherwise edit the tab navigation.
    articleView.handleMainNav();

    // The new articles we create will be given to the user as JSON so they can copy/paste it into their source data file.
    // STRETCH: Hide the export section for now, and show it once we have data to export.

    $('#article-export').hide();

    // TODOne: Add an event handler to update the preview (STRETCH: and the export field) if any inputs change.
    const form = $('#new-article');
    form.on('change', 'input, textarea', () => articleView.create());
};

articleView.create = () => {
    // TODOne: Set up a variable to hold the new article we are creating.
    // Clear out the #articles element, so we can put in the updated preview
    const newArticle = {
        title: $('#new-title').val(),
        category: $('#new-category').val(),
        body: $('#new-body').val(),
        author: $('#new-author').val(),
        authorUrl: $('#new-website').val(),
        publishedOn: $('#new-is-published').is(':checked') ? new Date() : 'Draft',
    };

    // TODOne: Instantiate an article based on what's in the form fields:
    // TODOne: Use our interface to the Handlebars template to put this new article into the DOM:

    this.daysAgo =
    $('#articles').show();
    const article = new Article(newArticle); //eslint-disable-line 
    const articleHtml = article.toHtml();

    $('#preview').html(articleHtml);


    // STRETCH: Activate the highlighting of any code blocks; look at the documentation for hljs to see how to do this by placing a callback function in the .each():
    // $('pre code').each();

    // STRETCH: Show our export field, and export the new article as JSON, so it's ready to copy/paste into blogArticles.js:
    $('#article-export').show();
    $('#article-json').val(JSON.stringify(newArticle, true, 2));
    $('#article-json').on('focus', function () {
        this.select();
    });

};
