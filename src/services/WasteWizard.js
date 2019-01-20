import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import Waste from '../models/Waste';

let wastes = []; // All the wastes
let favorites = []; // Favorite wastes

/**
 * The WasteWizard is responsible of:
 * 1 - Getting the data and creating the list of wastes
 * 2 - Extracting html from body of wastes
 * 3 - Searching through the list of wastes
 * 4 - Toggling the favorite status on wastes and keeping a list of favorite wastes
 */
const WasteWizard = {

  // Get the data and create a list of wastes
  init() {
    return new Promise((resolve, reject) => {
      axios.get('https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000')
        .then((response) => {
          const { status } = response;
          if (status !== 200) {
            const error = new Error(`Request Failed. Status Code: ${status}`);
            console.error(error);
            reject();
          } else {
            // Create waste objects with the received data and put it in a list
            wastes = response.data.map(waste => new Waste(
              waste.title,
              waste.keywords,
              waste.category,
              this.decodeHtml(waste.body),
            ));
            resolve();
          }
        })
        .catch((error) => {
          console.error(error);
          reject();
        });
    });
  },

  // Decode escaped html
  decodeHtml(escapedHtml) {
    const html = ReactHtmlParser(escapedHtml);
    return ReactHtmlParser(html[0]);
  },

  // Search a keyword through the list of wastes and return the search results
  search(keyword) {
    const results = [];
    const key = keyword.toLowerCase();

    // Return empty results list when search input is clear
    if (key === '') return results;

    // Search the keyword in the title and in the keywords
    wastes.forEach((waste) => {
      const titleContainsKey = waste.title.toLowerCase().includes(key);
      const keywordsContainsKey = waste.keywords.toLowerCase().includes(key);

      if (titleContainsKey || keywordsContainsKey) results.push(waste);
    });

    return results;
  },

  // Toggle the favorite status on a waste and return the updated favorties
  toggleFavorite(title) {
    // Find the waste having the given title and toggle its favorite status
    const wasteToToggle = wastes.find(waste => waste.title === title);
    wasteToToggle.toggleFavorite();

    // Update the favorite wastes list
    if (wasteToToggle.favorite) favorites.push(wasteToToggle);
    else favorites = favorites.filter(favorite => favorite.title !== title);

    return favorites;
  },
};

Object.freeze(WasteWizard);
export default WasteWizard;
