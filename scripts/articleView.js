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
// It is being called in index.html because we want only specific functions to be run when the html in that file is finished loading.
articleView.initIndexPage = () => {
    articleView.populateFilters();
    articleView.handleCategoryFilter();
    articleView.handleAuthorFilter();
    articleView.handleMainNav();
    articleView.setTeasers();
};



// COMMENT: Where is this function called? Why?
// It is being called in new.html because we want specific functions to be run when the html in that file is loaded.
articleView.initNewArticlePage = () => {
    // TODONE: Ensure the main .tab-content area is revealed. We might add more tabs later or otherwise edit the tab navigation.
    articleView.handleMainNav();
    // The new articles we create will be given to the user as JSON so they can copy/paste it into their source data file.
    // STRETCH: Hide the export section for now, and show it once we have data to export.

    $('#article-json').on('focus', function () {
        this.select();
    });

    // TODONE: Add an event handler to update the preview (STRETCH: and the export field) if any inputs change.
    $('#new-article').on('change', function() {
        articleView.create();
    });
};

articleView.create = () => {
    // TODONE: Set up a variable to hold the new article we are creating.
    // Clear out the #articles element, so we can put in the updated preview
    const date = new Date();
    const newPost = {

        // TODONE: Instantiate an article based on what's in the form fields:
        title: $('#new-title').val(),
        body: $('#new-body').val(),
        author: $('#new-author').val(),
        authorUrl: $('#new-website').val(),
        category: $('#new-category').val(),
        publishedOn: $('input:checked').val() ? `published ${date}` : '(draft)'
    };

    const blogPost = new Article(newPost); //eslint-disable-line
    const html = blogPost.toHtml();
    $('#articlesNew').html(html);



    // TODONE: Use our interface to the Handlebars template to put this new article into the DOM:
    // STRETCH: Activate the highlighting of any code blocks; look at the documentation for hljs to see how to do this by placing a callback function in the .each():
    // $('pre code').each();

    // STRETCH: Show our export field, and export the new article as JSON, so it's ready to copy/paste into blogArticles.js:
    $('#article-export').show();
    $('#article-json').val(JSON.stringify(newPost, true, 2));
};
