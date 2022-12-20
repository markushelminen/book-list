import { Client, Entity, Schema } from "redis-om";

const client = await new Client().open(
  "redis://default:7CNKAkAfw2WWcB9FtLzq998rUoutJKgJ@redis-18241.c293.eu-central-1-1.ec2.cloud.redislabs.com:18241"
);

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
