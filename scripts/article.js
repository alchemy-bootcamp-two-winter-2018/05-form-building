'use strict';

const articles = []; // eslint-disable-line

function Article (rawDataObj) {
    this.author = rawDataObj.author;
    this.authorUrl = rawDataObj.authorUrl;
    this.title = rawDataObj.title;
    this.category = rawDataObj.category;
    this.body = rawDataObj.body;
    this.publishedOn = rawDataObj.publishedOn;
}

Article.prototype.toHtml = function () {
    // STRETCHNE: Pass the article body into the marked.js library to format our Markdown input
    this.body = marked(this.body);

    const fillTemplate = Handlebars.compile($('#article-template').html());

    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000);
    this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';


    return fillTemplate(this);
};