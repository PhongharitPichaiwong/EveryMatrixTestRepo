import dotenv from 'dotenv';
import client from '../config/client';
import { Request, Response } from 'express';
import { log } from 'console';

dotenv.config();

const { DB_NAME, DB_MOVIES_COLLECTION } = process.env;

//GET: all movies
const getAllMovies = async (req: Request, res: Response) => {
  try {
    // Connect the client to the server
    await client.connect()

    const movies = client.db(DB_NAME).collection(DB_MOVIES_COLLECTION ?? '');
    const response = await movies.find({}).toArray() ?? [];
    console.log(`${response.length} movies found.}`);

    return res.status(200).json(response);
  } catch (error: any) {
    console.error('Error:', error);
    res.status(500).send('An error occurred when fetching the movies');
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

//GET: all movies in a category
const getMovieByGenre = async (req: Request, res: Response) => {
  try {
    const { genre } = req.params;
    
    await client.connect()

    const movies = client.db(DB_NAME).collection(DB_MOVIES_COLLECTION ?? '');
    const response = await movies.find({genre}).toArray();

    if (response.length === 0) {
      return res.status(404).json({ message: 'No movies found with the specified category' });
    }

    console.log(`${response.length} movies found  with the specified category.}`);
    return res.status(200).json(response);
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

const getMovieByTags = async (req: Request, res: Response) => {
  try {
    const tagsRaw = req.params.tags;
    let tags: string[] | any = typeof tagsRaw === 'string' ? tagsRaw.split(',') : Array.isArray(tagsRaw) ? tagsRaw : [];
    console.log(`tags: ${tags}`);

    await client.connect()

    const movies = client.db(DB_NAME).collection(DB_MOVIES_COLLECTION ?? '');
    const response = await movies.find({ tags: { $in: tags } }).toArray();

    console.log(`${response.length} movies found with the specified tags.}`);
    return res.status(200).json(response);
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

export { getAllMovies, getMovieByGenre, getMovieByTags };