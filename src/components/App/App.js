import React from 'react';
import './App.scss';

import WasteWizard from '../../services/WasteWizard';
import Search from '../Search/Search';
import ItemList from '../ItemList/ItemList';

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

  componentDidMount() {
    WasteWizard.init();
  }

  componentWillUnmount() {
    //
  }

  toggleFavorite(title) {
    const wastes = WasteWizard.toggleFavorite(title);

    this.setState({
      favorites: wastes,
    });
  }

  search(keyword) {
    const wastes = WasteWizard.search(keyword);

    this.setState({
      searchResults: wastes,
    });
  }

  render() {
    const { searchResults, favorites } = this.state;
    const appTitle = 'Toronto Waste Lookup';
    const favTitle = 'Favorites';

    const favReact = favorites.length > 1 ? (
      <div className="favorites">
        <h2 className="favorites-title">
          {favTitle}
        </h2>
        <ItemList items={favorites} toggleFavorite={this.toggleFavorite} />
      </div>
    ) : '';

    return (
      <div className="app">
        <h1 className="app-title">
          {appTitle}
        </h1>
        <Search onSearch={this.search} />
        <ItemList items={searchResults} toggleFavorite={this.toggleFavorite} />
        {favReact}
      </div>
    );
  }
}

export default App;
