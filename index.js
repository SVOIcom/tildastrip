/**
 * Модуль для превращения страницы тильды в свою
 */
const rp = require('request-promise-native');
const cheerio = require('cheerio');

/**
 * TildaPage untilding class
 */
class TildaPage {
    /**
     *
     * @param {string} url Tilda page URL
     * @param {{favicon:{string}, placeholders:{Object}, bodyHtml:{string}, pageUrl:{string}}} options Page options
     */
    constructor(url = '', options = {favicon: '', placeholders: [], bodyHtml: '', pageUrl: ''}) {
        this.url = url;
        this.options = options;
    }

    /**
     * Get stripped page
     * @return {Promise<void>}
     */
    async get() {
        let body = await rp(this.url);
        const $ = cheerio.load(body);

        if(this.options.placeholders) {
            for (let placeholder in this.options.placeholders) {
                if(this.options.placeholders.hasOwnProperty(placeholder)) {
                    let formPlaceholder = $(":contains(" + placeholder + ")");
                    formPlaceholder = $(formPlaceholder[formPlaceholder.length - 1]);

                    formPlaceholder.html(this.options.placeholders[placeholder]);
                }
            }
        }

        //Удаляем тильдовский футер
        $('#tildacopy').remove();

        let html = $.html();

        //Добавочный body код
        if(this.options.bodyHtml) {
            html = html.replace('</body>', this.options.bodyHtml + '</body>');
        }

        //Замена favicon
        if(this.options.favicon) {
            html = html.replace('<link rel="shortcut icon" href="https://static.tildacdn.com/img/tildafavicon.ico" type="image/x-icon">', '<link rel="shortcut icon" href="' + this.options.favicon + '" type="image/x-icon">');
        }

        //Замена canonical и страницы в микроразметке
        if(this.options.pageUrl) {
            html = html.replace(this.url, this.options.pageUrl);
            html = html.replace(this.url, this.options.pageUrl);
        }
        return html;
    }
}

module.exports = TildaPage;