import { NextApiRequest, NextApiResponse } from "next";
import { getRepo } from "../../../lib/redis";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  const repository = await getRepo();

  switch (method) {
    case "GET":
      try {
        const books = await repository.search().returnAll({ pageSize: 100 });
        return res.status(200).json(books);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    case "PUT":
      try {
        const book = repository.createAndSave(body);
        return res.status(200).json(book);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    default:
      return res.status(400).json({ message: "Method is not supported" });
  }
}
