import { MongoClient, Db } from 'mongodb';

export default class MongoDbConnection {
  private static instance: Db | null = null;

  private constructor() {}

  static async getInstance(): Promise<Db> {
    if (MongoDbConnection.instance === null) {
      const mongoDbConnection = new MongoDbConnection();
      MongoDbConnection.instance = await mongoDbConnection.connectToDatabase();
    }
    return MongoDbConnection.instance;
  }

  private async connectToDatabase(): Promise<Db> {
    const mongoClient = new MongoClient(process.env.MONGODBURL as string);
    await mongoClient.connect();
    const database = mongoClient.db('petGrooming');
    return database;
  }
}
