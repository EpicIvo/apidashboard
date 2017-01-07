import traverse from 'traverse';

/**
 * This function traverses trough the whole page (all objects and arrays).
 * When it finds an object with a property key named after the language,
 * it will replace the object with the contents of the value.
 * @param {*} page
 * @param {string} language
 * @return {string} the page with only
 */
export default function (page, language) {
    const translatedPage = traverse(page).map(function (object) {
        // Check if property with key == language exists
        if (object[language]) {
            this.update(object[language]);
        }

        // Check if property with key == en exists (fallback)
        else if (object['en']) {
            this.update(object['en']);
        }
    });

    if (translatedPage.meta) translatedPage.meta.language = language;

    return translatedPage;
}
