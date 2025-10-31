const mongoose = require('mongoose');

const SearchTermSchema = new mongoose.Schema({
  term: {
    type: String,
    required: true,
    unique: true,
  },
  count: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model('SearchTerm', SearchTermSchema);