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
/* export async function createBook(data) {
  await connect();

  const repository = new Repository(schema, client);

  const book = repository.createEntity(data);

  const id = await repository.save(book);

  return id;
}

export async function getAllBooks() {
  await connect();
  await indexBooks();
  const repository = new Repository(schema, client);
  const books = await repository.search().returnAll({ pageSize: 100 });
  return books;
}

export async function updateBook(req) {
  await connect();
  const repository = new Repository(schema, client);
  const book = await repository.fetch(req.params.id);

  book.title = req.body.title ?? null;
  book.author = req.body.author ?? null;
  book.description = req.body.description ?? null;

  await repository.save(book);  

  return book;
}

export async function removeBook(id) {
  await connect();
  const repository = new Repository(schema, client);
  await repository.remove(id);
}

export async function indexBooks() {
  await connect();
  const repository = new Repository(schema, client);
  await repository.createIndex();
}
 */
