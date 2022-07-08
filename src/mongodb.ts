import { MongoClient } from 'mongodb';

export default async function main() {
  const client = new MongoClient(process.env.DATABASE_HOSTNAME);

  await client.connect();

  return client.db(process.env.DATABASE_NAME);
}
