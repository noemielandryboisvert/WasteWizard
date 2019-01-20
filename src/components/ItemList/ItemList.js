import React from 'react';
import PropTypes from 'prop-types';

import Waste from '../../models/Waste';
import Item from '../Item/Item';

/**
 * ItemList component:
 * A list of Item components
 */
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

    // For each items, render an Item component
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
