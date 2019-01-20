import React from 'react';
import './App.scss';

import WasteWizard from '../../services/WasteWizard';
import Search from '../Search/Search';
import ItemList from '../ItemList/ItemList';

/**
 * App components renders:
 * 1 - Search component
 * 2 - ItemsList component
 * 3 - If there's two or more favorite items: list of favorites
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      favorites: [],
    };

    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.search = this.search.bind(this);
  }

  // Toggle the favorite status on a waste and update the App favorites
  toggleFavorite(title) {
    const favorites = WasteWizard.toggleFavorite(title);
    this.setState({ favorites });
  }

  // Search a keyword and update the App searchResults
  search(keyword) {
    const searchResults = WasteWizard.search(keyword);
    this.setState({ searchResults });
  }

  render() {
    const { searchResults, favorites } = this.state;

    return (
      <div className="app">
        <Search onSearch={this.search} key="app-search" />
        <ItemList items={searchResults} toggleFavorite={this.toggleFavorite} key="app-itemList" />
        {
          favorites.length > 1 && (
          <div className="favorites">
            <h2 className="favorites-title">
              Favorites
            </h2>
            <ItemList items={favorites} toggleFavorite={this.toggleFavorite} />
          </div>
          )
        }
      </div>
    );
  }
}

export default App;
