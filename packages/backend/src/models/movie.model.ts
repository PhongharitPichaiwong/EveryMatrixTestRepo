import { Schema, model, Types } from 'mongoose';
import { MetadataInfo, MovieType, Picture } from '../types/movie.types';

const pictureSchema = new Schema<Picture>({
  url: String,
});

const metadataInfoSchema = new Schema<MetadataInfo>({
  pictures: [pictureSchema],
  metaTitle: String,
  metaDescription: String,
});

const movieSchema = new Schema<MovieType>({
  title: String,
  description: String,
  genre: String,
  tags: [String],
  length: Number,
  dateReleased: Date,
  dateAvailableUntil: Date,
  metadataInfo: metadataInfoSchema,
  movie_id: {
    type: Types.ObjectId,
    ref: 'movies',
  },
  thumbnail: String,
});

const MovieModel = model<MovieType>('movies', movieSchema);

export default MovieModel;