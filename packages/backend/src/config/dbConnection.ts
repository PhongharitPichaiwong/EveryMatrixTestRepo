import mongoose from 'mongoose';
import client from './client';

mongoose.Promise = global.Promise;

class Database {
  connect = async (): Promise<void> => {
     client.connect()
      .then(() => {
        console.log('Connected to the database');
      })
      .catch((error) => {
        console.error('Error connecting to the database:', error.message);
      });
  }

  disconnect = async (): Promise<void> => {
    mongoose.disconnect();
  }
}

export default new Database();