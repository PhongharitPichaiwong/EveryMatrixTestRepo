import { Router } from 'express';
import { getAllMovies, getMovieByGenre, getMovieByTags } from '../controllers/movie.controller';

const movieRoute = () => {
  const router = Router();

  router.get('/movies', getAllMovies);

  router.get('/movies/:genre', getMovieByGenre);

  router.get('/movies/tags/:tags', getMovieByTags);
  

  return router;
};

export { movieRoute };