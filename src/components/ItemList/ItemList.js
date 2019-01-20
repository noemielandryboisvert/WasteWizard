import React from 'react';
import PropTypes from 'prop-types';
import './ItemList.scss';

import Waste from '../../models/Waste';
import Item from '../Item/Item';

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    //
  }

  componentWillUnmount() {
    //
  }

  render() {
    const { items, toggleFavorite } = this.props;
    const itemsReact = [];
    items.forEach((result) => {
      itemsReact.push(
        <Item
          key={result.title}
          title={result.title}
          description={result.description}
          favorite={result.favorite}
          toggleFavorite={toggleFavorite}
        />,
      );
    });

    return (
      <div className="search-results">
        {itemsReact}
      </div>
    );
  }
}

ItemList.propTypes = {
  items: PropTypes.arrayOf(Waste).isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};

export default ItemList;
