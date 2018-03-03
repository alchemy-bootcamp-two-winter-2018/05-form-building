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
// This function is called at the end of our HTML, so the page is fully loaded before we run it
articleView.initIndexPage = () => {
    articleView.populateFilters();
    articleView.handleCategoryFilter();
    articleView.handleAuthorFilter();
    articleView.handleMainNav();
    articleView.setTeasers();
};




// COMMENT: Where is this function called? Why?
// This function is called at the end of new.html to ensure the document finishes loading before we run code
articleView.initNewArticlePage = () => {
    // TODOne: Ensure the main .tab-content area is revealed. We might add more tabs later or otherwise edit the tab navigation.
    $('#articles').empty();
    $('tab-content').show();

    // The new articles we create will be given to the user as JSON so they can copy/paste it into their source data file.
    // STRETCH: Hide the export section for now, and show it once we have data to export.

    $('#article-json').on('focus', function () {
        this.select();
    });

    // TODOne: Add an event handler to update the preview (STRETCH: and the export field) if any inputs change.
    const form = $('#new-article');
    form.on('change', 'input,textarea', () => articleView.create());
};

// TODO: refactor this...?
const todaysDate = new Date();
const todaysMonth = todaysDate.getUTCMonth() + 1;
const todaysYear = todaysDate.getUTCFullYear();
const todaysDay = todaysDate.getUTCDate();
const todaysDateFormat = `${todaysYear}-${todaysMonth}-${todaysDay}`;
const publishDate = () => {
    if ($('#new-is-published').is(':checked')) {
        return todaysDateFormat;
    }
    else {
        return '';
    }
};

articleView.create = () => {
    console.log('create was called');
    // TODOne: Set up a variable to hold the new article we are creating.
    publishDate();
    const data = {
        title: $('#new-title').val(),
        category: $('#new-category').val(),
        author: $('#new-author').val(),
        authorUrl: $('#new-website').val(),
        publishedOn: publishDate(),
        body: $('#new-body').val()

    };
    // Clear out the #articles element, so we can put in the updated preview
    // Done above in initNewArticlePage

    // TODOne: Instantiate an article based on what's in the form fields:
    const article = new Article(data);
    console.log(article);

    // TODOne: Use our interface to the Handlebars template to put this new article into the DOM:
    const html = article.toHtml();
    $('#articles').html(html);

    // STRETCH: Activate the highlighting of any code blocks; look at the documentation for hljs to see how to do this by placing a callback function in the .each():
    // $('pre code').each();

    // STRETCH: Show our export field, and export the new article as JSON, so it's ready to copy/paste into blogArticles.js:

};
