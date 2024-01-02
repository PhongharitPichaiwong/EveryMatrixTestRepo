import { Router } from 'express';

const movieRoute = () => {
  const router = Router();
  
  router.post('/movies', (req, res) => {
    // TODO logic for creating role
  });

  router.get('/movies', (req, res) => {
    // TODO logic for retrieving roles
  });
  
  router.get('/movies/:id', (req, res) => {
    // TODO logic for retrieving role
  });

  router.put('/movies/:id', (req, res) => {
    // TODO logic for updating role
  });
  
  router.delete('/movies/:id', (req, res) => {
    // TODO logic for deleting role
  });
  
  return router;
};