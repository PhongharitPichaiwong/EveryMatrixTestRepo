const express = require('express');

const router = express.Router();
const Movie = require('../core/models/movie');

// Endpoints
router.get('/getMovies', async (res) => {
    // try {
    //     const data = await Movie.find() ;
    //     res.json(data);
    // } catch (error) {
    //     res.status(500).json({ message: error.message });
    // }
});

router.get('/moviesInCategory/:categoryId', async (req, res) => {
  try {
      const categoryId = req.params.categoryId;

      // Check if the category exists
      const category = await Category.findById(categoryId);
      if (!category) {
          return res.status(404).json({ message: 'Category not found' });
      }

      // Find all movies in the category
      const moviesInCategory = await Movie.find({ category: categoryId });

      res.json(moviesInCategory);
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;