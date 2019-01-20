import axios from 'axios';
import Waste from '../models/Waste';

const wastes = []; // All the wastes
let favorites = []; // Favorite wastes

/**
 * The WasteWizard is responsible of:
 * 1 - Getting the data and creating a list of wastes
 * 2 - Searching through that list
 * 3 - Toggling the favorite status on wastes and keeping a list of favorite wastes
 */
const WasteWizard = {

  // Init the WasteWizard by getting the data and creating a list of Waste
  init() {
    return new Promise((resolve, reject) => {
      axios.get('https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000')
        .then((response) => {
          const { status } = response;
          if (status !== 200) {
            const error = new Error(`Request Failed. Status Code: ${status}`);
            console.error(error.message);
            reject();
          } else {
            // Create waste object with the received data and put it in a list
            response.data.forEach((w) => {
              const waste = new Waste(w.title, w.keywords, w.category, w.body);
              wastes.push(waste);
            });
            resolve();
          }
        })
        .catch((error) => {
          console.error(error);
          reject();
        });
    });
  },

  // Search a keyword through the list of wastes and returns the search results
  search(keyword) {
    const results = [];
    const k = keyword.toLowerCase();

    // Return empty results list when search input is clear
    if (k === '') return results;

    // Search the keyword in the title and in the keywords
    wastes.forEach((w) => {
      if (w.title.toLowerCase().includes(k)) results.push(w);
      else if (w.keywords.toLowerCase().includes(k)) results.push(w);
    });

    return results;
  },

  // Toggle the favorite status on a waste and returns the updated favorties
  toggleFavorite(title) {
    // Find the waste with having the given title and toggle its favorite status
    const waste = wastes.find(w => w.title === title);
    waste.toggleFavorite();

    // Update the favorite wastes list
    if (waste.favorite) favorites.push(waste);
    else {
      favorites = favorites.filter(w => w.title !== title);
    }

    return favorites;
  },
};

Object.freeze(WasteWizard);
export default WasteWizard;
