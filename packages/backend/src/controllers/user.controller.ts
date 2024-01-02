import dotenv from 'dotenv';
import client from '../config/client';
import { Request, Response } from 'express';
import { log } from 'console';
import { UserType } from '../types/user.types';
import { ObjectId } from 'mongodb';

dotenv.config();

const { DB_NAME, DB_USERS_COLLECTION, DB_MOVIES_COLLECTION } = process.env;

//GET: all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    // Connect the client to the server
    await client.connect()

    const users = client.db(DB_NAME).collection(DB_USERS_COLLECTION ?? '');
    const response = await users.find({}).toArray() ?? [];
    console.log(`${response.length} users found.}`);

    return res.status(200).json(response);
  } catch (error: any) {
    console.error('Error:', error);
    res.status(500).send('An error occurred when fetching the users');
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

//GET: single user’s details (with movies)
const getUserInfoById = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    
    await client.connect()

    const users = client.db(DB_NAME).collection(DB_USERS_COLLECTION ?? '');
    const userResult: any = await users.aggregate([
      {
        $match: {
          user_id: new ObjectId(user_id),
        },
      },
    ]).toArray() ?? [];

    if (userResult.length === 0) {
      return res.status(404).json({ message: 'No user found with the specified id' });
    }
    console.log(`Found the user with the specified id is ${userResult}.}`);

    let movieIdsArray: never[] = [];
    userResult.forEach((element: any) => {
      log(`element: ${element.favoriteMovies}`);
      
      movieIdsArray = element.favoriteMovies?.map((i: any) => {
        log(`element.movie_id ${i.movie_id}`);
        return new ObjectId(i.movie_id);
      });
    });
    log(`movieIdsArray: ${movieIdsArray.length}`);

    const movies = client.db(DB_NAME).collection(DB_MOVIES_COLLECTION ?? '');
    const moviesResult = await movies.aggregate([
      {
        $match: {
          movie_id: {
            $in: movieIdsArray,
          },
        },
      },
    ]).toArray() ?? [];

    log(`${moviesResult.length} movies found.}`);
    
    return res.status(200).json({ user: userResult, movies: moviesResult });
  } catch (error: any) {
    console.error('Error:', error);
  
    if (error?.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    res.status(500).send('An error occurred when fetching the movies');
  } finally {
    await client.close();
  }
};

export { getAllUsers, getUserInfoById };