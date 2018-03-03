'use strict';

const articleView = {};


articleView.populateFilters = () => {
    $('article').each(function () {
        let val = $(this).find('address a').text();
        let optionTag = `<option value="${val}">${val}</option>`;

        if ($(`#author-filter option[value="${val}"]`).length === 0) {
            $('#author-filter').append(optionTag);
        }

        val = $(this).attr('data-category');
        optionTag = `<option value="${val}">${val}</option>`;
        if ($(`#category-filter option[value="${val}"]`).length === 0) {
            $('#category-filter').append(optionTag);
        }
    });
};

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
    $('.article-body *:nth-of-type(n+2)').hide();
    $('article').on('click', 'a.read-on', function (e) {
        e.preventDefault();
        if ($(this).text() === 'Read on →') {
            $(this).parent().find('*').fadeIn();
            $(this).html('Show Less &larr;');
        } else {
            $('body').animate({
                scrollTop: ($(this).parent().offset().top)
            }, 200);
            $(this).html('Read on &rarr;');
            $(this).parent().find('.article-body *:nth-of-type(n+2)').hide();
        }
    });
};

// COMMENT: Where is this function called? Why?
// This is called in the script tag of the index.html because we only want this function to be called on that page.
articleView.initIndexPage = () => {
    articleView.populateFilters();
    articleView.handleCategoryFilter();
    articleView.handleAuthorFilter();
    articleView.handleMainNav();
    articleView.setTeasers();
};



// COMMENT: Where is this function called? Why?
// This is called in the script tag of the new.html because we only want this function to be called on that page.
articleView.initNewArticlePage = function () {
    // TODOne: Ensure the main .tab-content area is revealed. We might add more tabs later or otherwise edit the tab navigation.
    articleView.handleMainNav();
    // The new articles we create will be given to the user as JSON so they can copy/paste it into their source data file.
    // STRETCH: Hide the export section for now, and show it once we have data to export.

    $('#article-json').on('focus', function () {
        this.select();
    });

    // TODOne: Add an event handler to update the preview (STRETCH: and the export field) if any inputs change.
    const form = $('#new-article');
    form.on('change', 'input, textarea', () => this.create());
};

articleView.create = () => {
    // TODOne: Set up a variable to hold the new article we are creating.
    // Clear out the #articles element, so we can put in the updated preview
    $('.tab-content').show();
    const preview = $('#articles');

    // TODOne: Instantiate an article based on what's in the form fields:
    const date = new Date();
    const data = {
        title: $('#new-title').val(),
        body: $('#new-body').val(),
        author: $('#new-author').val(),
        authorUrl: $('#new-website').val(),
        category: $('#new-category').val(),
        publishedOn: `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
    };

    // TODOne: Use our interface to the Handlebars template to put this new article into the DOM:
    const article = new Article(data);
    const html = article.toHtml();
    preview.html(html);

    // STRETCH: Activate the highlighting of any code blocks; look at the documentation for hljs to see how to do this by placing a callback function in the .each():
    // $('pre code').each();

    // STRETCH: Show our export field, and export the new article as JSON, so it's ready to copy/paste into blogArticles.js:

};
