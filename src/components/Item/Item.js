import React from 'react';
import PropTypes from 'prop-types';
import './Item.scss';

/**
 * Item component renders:
 * 1 - If item is favorite: Green star
 *     Else: Grey star
 * 2 - Item title
 * 3 - Item description
 */
const Item = ({
  title,
  description,
  favorite,
  toggleFavorite,
}) => (
  <div className="item">
    <button
      className={`favorite ${favorite ? 'fav' : 'not-fav'}`}
      type="button"
      onClick={() => toggleFavorite(title)}
    >
      ☆
    </button>
    <span className="item-title">{title}</span>
    <div className="item-desc">
      {description}
    </div>
  </div>
);

Item.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.arrayOf(PropTypes.node).isRequired,
  favorite: PropTypes.bool.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};

export default Item;
