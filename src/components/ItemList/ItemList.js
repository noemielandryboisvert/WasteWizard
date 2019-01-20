import React from 'react';
import PropTypes from 'prop-types';

import Waste from '../../models/Waste';
import Item from '../Item/Item';

/**
 * ItemList component renders:
 * 1 - List of Item components
 */
const ItemList = ({ items, toggleFavorite }) => (
  <div className="search-results">
    {
      items.map(item => (
        <Item
          key={item.title}
          title={item.title}
          description={item.description}
          favorite={item.favorite}
          toggleFavorite={toggleFavorite}
        />
      ))
    }
  </div>
);

ItemList.propTypes = {
  items: PropTypes.arrayOf(Waste).isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};

export default ItemList;
