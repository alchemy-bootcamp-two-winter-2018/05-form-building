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

// COMMENTed: Where is this function called? Why?
// Wow, really driving this point home. It's called at the bottom of the index.html page, so the methods needed to make the page work get called as soon as it loads.
articleView.initIndexPage = () => {
    articleView.populateFilters();
    articleView.handleCategoryFilter();
    articleView.handleAuthorFilter();
    articleView.handleMainNav();
    articleView.setTeasers();
};

// TODOne: Add an event handler to update the preview (STRETCH: and the export field) if any inputs change.
articleView.handleForm = function() {
    $('form').on('input change', 'input, textarea', () => this.create());
};

// COMMENTed: Where is this function called? Why?
// Called at the bottom of the new HTML page so the appropriate methods get called when the page is visited and ready.
articleView.initNewArticlePage = function() {
    // TODOne: Ensure the main .tab-content area is revealed. We might add more tabs later or otherwise edit the tab navigation.
    $('#write').show();
    // Clear out the #articles element, so we can put in the updated preview
    $('#articles').empty();
    // The new articles we create will be given to the user as JSON so they can copy/paste it into their source data file.
    // STRETCH: Hide the export section for now, and show it once we have data to export.
    $('#article-json').on('focus', function () {
        this.select();
    });
    $('#article-export').hide();

    this.handleForm();
};

function getPublishedOn(val) {
    if (!val) return null;
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

articleView.create = () => {
    // TODOne: Set up a variable to hold the new article we are creating.
    const newData = {
        category: $('#new-category').val(),
        author: $('#new-author').val() || 'anonymous',
        authorUrl: $('#new-website').val(),
        title: $('#new-title').val(),
        body: $('#new-body').val(),
        publishedOn: getPublishedOn($('#new-is-published:checked').val())
    };

    // TODOne: Instantiate an article based on what's in the form fields:
    const myArticle = new Article(newData); //eslint-disable-line

    // TODOne: Use our interface to the Handlebars template to put this new article into the DOM:
    $('#articles').html(myArticle.toHtml());

    // STRETCH: Activate the highlighting of any code blocks; look at the documentation for hljs to see how to do this by placing a callback function in the .each():
    // $('pre code').each();

    // STRETCH: Show our export field, and export the new article as JSON, so it's ready to copy/paste into blogArticles.js:
    $('#article-export').show();
    $('#article-export input').val(JSON.stringify(newData, true, 2));
};
