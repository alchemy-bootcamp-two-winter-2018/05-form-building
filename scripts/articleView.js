'use strict';

const articleView = {};

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1; //January is 0!
const yyyy = today.getFullYear();

if(dd < 10) {
    dd = '0' + dd;
}

if(mm < 10) {
    mm = '0' + mm;
}

today = yyyy + '-' + mm + '-' + dd;


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
// PUT YOUR RESPONSE HERE
articleView.initIndexPage = () => {
    articleView.populateFilters();
    articleView.handleCategoryFilter();
    articleView.handleAuthorFilter();
    articleView.handleMainNav();
    articleView.setTeasers();
};

articleView.formChange = function() {
    const form = $('#new-article');
    form.on('change', 'input,textarea', () => articleView.create());
};

// COMMENT: Where is this function called? Why?
// PUT YOUR RESPONSE HERE
articleView.initNewArticlePage = () => {
    // TODOne: Ensure the main .tab-content area is revealed. We might add more tabs later or otherwise edit the tab navigation.
    $('.main-nav .tab:first').click();

    // The new articles we create will be given to the user as JSON so they can copy/paste it into their source data file.
    // STRETCH: Hide the export section for now, and show it once we have data to export.

    $('#article-json').on('focus', function () {
        this.select();
    });

    // TODOne: Add an event handler to update the preview (STRETCH: and the export field) if any inputs change.
    articleView.formChange();
};

articleView.create = () => {
    // TODOne: Set up a variable to hold the new article we are creating.
    const data = {
        title: $('#new-title').val(),
        category: $('#new-category').val(),
        author: $('#new-author').val(),
        authorUrl: $('#new-website').val(),
        publishedOn: $('#new-is-published').is(':checked') ? today : '',
        body: $('#new-body').val()
    };

    $('#article-export').show();
    $('#article-json').val(JSON.stringify(data, true, 2));

    //eslint-disable-next-line
    const article = new Article(data);
    const html = article.toHtml();
    // Clear out the #articles element, so we can put in the updated preview
    $('#preview').html(html);


    // TODOne: Instantiate an article based on what's in the form fields:


    // TODOne: Use our interface to the Handlebars template to put this new article into the DOM:


    // STRETCH: Activate the highlighting of any code blocks; look at the documentation for hljs to see how to do this by placing a callback function in the .each():
    // $('pre code').each();

    // STRETCH: Show our export field, and export the new article as JSON, so it's ready to copy/paste into blogArticles.js:


};
