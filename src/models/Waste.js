const Waste = function(title, keywords, category, description) {
  this.title = title;
  this.keywords = keywords;
  this.category = category;
  this.description = description;
  this.favorite = false;

  this.toggleFavorite = function() {
    this.favorite = !this.favorite;
  };
};

export default Waste;
