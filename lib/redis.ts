import { Client, Entity, Schema } from "redis-om";

const client = await new Client().open(process.env.REDIS_URL);

interface Book {
  title: string;
  author: string;
  description: string;
}

class Book extends Entity {}
const schema = new Schema(
  Book,
  {
    title: { type: "string" },
    author: { type: "string" },
    description: { type: "string" },
  },
  {
    dataStructure: "JSON",
  }
);
const repo = client.fetchRepository(schema);

export async function getRepo() {
  await repo.createIndex();
  return repo;
}
