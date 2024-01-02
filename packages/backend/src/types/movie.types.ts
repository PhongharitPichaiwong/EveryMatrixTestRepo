import { Document, Schema } from 'mongoose';

interface Picture {
  url: string;
}

interface MetadataInfo {
  pictures: Picture[];
  metaTitle: string;
  metaDescription: string;
}

interface MovieType extends Document {
  title: string;
  description: string;
  genre: string;
  tags: string[];
  length: number;
  dateReleased: Date;
  dateAvailableUntil: Date;
  metadataInfo: MetadataInfo;
  movie_id: Schema.Types.ObjectId;
  thumbnail: string;
}

export type {Picture, MovieType, MetadataInfo};