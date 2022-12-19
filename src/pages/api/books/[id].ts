import { NextApiRequest, NextApiResponse } from "next";
import { getRepo } from "../../../lib/redis";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body,
    query: { id },
  } = req;
  const repository = await getRepo();

  switch (method) {
    case "GET":
      try {
        const book = await repository.fetch(String(id));

        if (!book.entityId)
          return res.status(404).json({ message: "Book Not Found" });

        return res.status(200).json(book);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    case "POST":
      try {
        const { title, author, description } = body;
        const book = await repository.fetch(String(id));

        book.title = title ?? null;
        book.author = author ?? null;
        book.description = description ?? null;

        await repository.save(book);

        return res.status(200).json(book);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    case "DELETE":
      try {
        await repository.remove(String(id));

        return res.json({ entityId: String(id) });
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    default:
      return res.status(400).json({ message: "Method is not supported" });
  }
};
