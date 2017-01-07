import data from '../../data';
import parsePageWithLanguage from './parsePageWithLanguage';
import getNested from 'get-nested';
import debug from 'debug';
import createSlug from './createSlug';

const log = debug('burst:API');

let page = {};

class API {
    static getPage() {
        return page;
    }

    static getLanguage() {
        return page.language;
    }

    static changeUrl(url) {
        page = data.pages
        // Only return the page with the right path
            .reduce((prev, page) => {
                if (prev || !getNested(() => page.paths)) {
                    return prev;
                }

                const paths = page.paths.filter(path =>
                    path.url instanceof RegExp ? path.url.test(url) : path.url == url
                );
                if (!paths || !paths.length) return false;

                return parsePageWithLanguage(page, paths[0].language);
            }, false);

        if (!page) {
            log(`Tried to change the url to ${url}, but page not found. Returning 404 page.`);
            page = parsePageWithLanguage(data.pageNotFound, url.split('/')[0]);
        }
        else {
            log(`Changed page to ${url}.`);
            log(page);
        }

        page.url = url;
        page.id = createSlug(url);

    }

    static getSettings() {
        return data.settings;
    }
}

export default API;
