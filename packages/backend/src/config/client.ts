import { MongoClient, MongoClientOptions } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const { DB_HOST, DB_USER, DB_PASS } = process.env;
const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}`;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as MongoClientOptions;

const client = new MongoClient(uri, options);

export default client;
