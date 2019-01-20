import React from 'react';
import './App.scss';

import WasteWizard from '../../services/WasteWizard';
import Search from '../Search/Search';
import ItemList from '../ItemList/ItemList';

/**
 * App component:
 * Base component of the application. It contains all the others!
 * It is responsible for:
 * 1 - Init the WasteWizard
 * 2 - Handling errors when initiating the WasteWizard
 * 3 - Keeping a list of searchResults
 * 4 - Keeping a list of favorites
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      favorites: [],
      ready: 0, // 0: Not ready, 1: Ready, 2: Something went wrong!
    };

    this.init = this.init.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    //
  }

  // Init the WasteWizard and update the App ready state
  init() {
    WasteWizard.init()
      .then(() => {
        this.setState({
          ready: 1,
        });
      }).catch(() => {
        this.setState({
          ready: 2,
        });
      });
  }

  // Toggle the favorite status on a waste and update the App favorites
  toggleFavorite(title) {
    const wastes = WasteWizard.toggleFavorite(title);

    this.setState({
      favorites: wastes,
    });
  }

  // Perfrom a search and update the App searchResults
  search(keyword) {
    const wastes = WasteWizard.search(keyword);

    this.setState({
      searchResults: wastes,
    });
  }

  render() {
    const { searchResults, favorites, ready } = this.state;

    const titleReact = (
      <h1 className="app-title">
        Toronto Waste Lookup
      </h1>
    );

    // If there's at least 2 favorites, render a list of favorites
    const favReact = favorites.length > 1 ? (
      <div className="favorites">
        <h2 className="favorites-title">
          Favorites
        </h2>
        <ItemList items={favorites} toggleFavorite={this.toggleFavorite} />
      </div>
    ) : '';

    let appReact = [];

    // The App is not ready yet!
    if (ready === 0) {
      appReact = (
        <span className="loading">
            Loading...
        </span>
      );
    // The App is ready, render the search bar, the search results and the favorites
    } else if (ready === 1) {
      appReact = [
        <Search onSearch={this.search} />,
        <ItemList items={searchResults} toggleFavorite={this.toggleFavorite} />,
      ];
    // Something went wrong!
    } else {
      appReact = (
        <span className="error">
          Something went wrong. <button type="button" onClick={this.init}>Retry</button>
        </span>
      );
    }

    return (
      <div className="app">
        { titleReact }
        { appReact }
        { favReact }
      </div>
    );
  }
}

export default App;
