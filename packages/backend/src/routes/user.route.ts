import { Router } from 'express';
import { getAllUsers, getUserInfoById } from '../controllers/user.controller';

const userRoute = () => {
  const router = Router();

  router.get('/users', getAllUsers);

  router.get('/users/:user_id', getUserInfoById);  

  return router;
};

export { userRoute };