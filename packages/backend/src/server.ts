import 'module-alias/register';
import http from 'http';
import express, { Express } from 'express';
import { movieRoute } from './routes/movie.route';
import { userRoute } from './routes/user.route';

const router: Express = express();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.use((req, res, next) => {
  // set the CORS policy
  res.header('Access-Control-Allow-Origin', '*');
  // set the CORS headers
  res.header(
    'Access-Control-Allow-Headers',
    'origin,X-Requested-With,Content-Type,Accept,Authorization'
  );

  // set the CORS method headers
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    return res.status(200).json({});
  }
  next();
});

// set routes
router.use('/', userRoute());
router.use('/', movieRoute());


/** Error handling */
router.use((_, res) => {
  const error = new Error('not found');
  return res.status(404).json({
    message: error.message,
  });
});

// Start that server
const httpServer = http.createServer(router);
const HOST = process.env.HOST || 'http://localhost';
const PORT: string | number = process.env.PORT ?? 8080;

httpServer.listen(PORT, async () => {
    // database.connect();
    console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});