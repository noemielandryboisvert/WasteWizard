import React from 'react';
import PropTypes from 'prop-types';
import './Item.scss';

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

  getHtml() {
    const { description } = this.props;
    return { __html: description };
  }

  toggleFavorite() {
    const { title, toggleFavorite } = this.props;
    toggleFavorite(title);
  }

  render() {
    const { title, favorite } = this.props;
    const favClass = favorite ? 'fav' : 'not-fav';

    return (
      <div className="item">
        <button className={`favorite ${favClass}`} type="button" onClick={this.toggleFavorite}>☆</button>
        <span className="item-title">{title}</span>
        <div className="item-desc" dangerouslySetInnerHTML={this.getHtml()} />
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
