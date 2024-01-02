import { Schema, model } from 'mongoose';
import { FavoriteMovie, UserPreferences, UserType } from '../types/user.types';

const FavoriteMovieSchema = new Schema<FavoriteMovie>({
  movie_id: {
    $oid: String,
  },
  rating: {
    $numberInt: String,
  },
});

const UserPreferencesSchema = new Schema<UserPreferences>({
  favoriteCategories: [String],
  websiteTheme: String,
});

const userSchema = new Schema<UserType>({
  _id: {
    $oid: String,
  },
  user_id: {
    $oid: String,
  },
  username: String,
  password: String,
  fullname: String,
  email: String,
  phone: String,
  favoriteMovies: [FavoriteMovieSchema],
  preferences: UserPreferencesSchema,
});

const UserModel = model<UserType>('users', userSchema);

export default UserModel;