import React from 'react';
import PropTypes from 'prop-types';
import './Item.scss';

import ReactHtmlParser from 'react-html-parser';

/**
 * Item component contains:
 * 1 - Star indicating if the item is a favorite or not
 * 2 - Item title
 * 3 - Item description
 */
class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  componentDidMount() {
    //
  }

  componentWillUnmount() {
    //
  }

  // Call toggleFavorite with the title
  toggleFavorite() {
    const { title, toggleFavorite } = this.props;
    toggleFavorite(title);
  }

  render() {
    const { title, favorite, description } = this.props;
    const favClass = favorite ? 'fav' : 'not-fav';

    // description contains unescape html that we want to render!
    const descHtml = ReactHtmlParser(description);

    return (
      <div className="item">
        <button className={`favorite ${favClass}`} type="button" onClick={this.toggleFavorite}>☆</button>
        <span className="item-title">{title}</span>
        <div className="item-desc">
          {ReactHtmlParser(descHtml[0])}
        </div>
      </div>
    );
  }
}

Item.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  favorite: PropTypes.bool.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};

export default Item;
