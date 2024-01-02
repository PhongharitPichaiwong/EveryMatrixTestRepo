import { Schema, model, Document } from 'mongoose';

interface FavoriteMovie {
  movie_id: {
    $oid: string;
  };
  rating: {
    $numberInt: string;
  };
}

interface UserPreferences {
  favoriteCategories: string[];
  websiteTheme: string;
}

interface UserType extends Document {
  _id: {
    $oid: string;
  };
  user_id: {
    $oid: string;
  };
  username: string;
  password: string;
  fullname: string;
  email: string;
  phone: string;
  favoriteMovies: FavoriteMovie[];
  preferences: UserPreferences;
};

export type {UserType, UserPreferences, FavoriteMovie};