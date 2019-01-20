import axios from 'axios';
import Waste from '../models/Waste';

const wastes = [];
let favorites = [];

const WasteWizard = {
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

  search(keyword) {
    const results = [];
    const k = keyword.toLowerCase();

    if (k === '') return results;

    wastes.forEach((w) => {
      if (w.title.toLowerCase().includes(k)) results.push(w);
      else if (w.keywords.toLowerCase().includes(k)) results.push(w);
    });

    return results;
  },

  toggleFavorite(title) {
    const waste = wastes.find(w => w.title === title);
    waste.toggleFavorite();

    if (waste.favorite) favorites.push(waste);
    else {
      favorites = favorites.filter(w => w.title !== title);
    }

    return favorites;
  },
};

export default WasteWizard;
