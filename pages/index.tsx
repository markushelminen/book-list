import Drawer from "@mui/material/Drawer";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";
import BookForm from "../components/BookForm";
import BookListItem from "../components/BookListItem";

export interface Book {
  title: string;
  author: string;
  description: string;
  entityId?: string;
}

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

const Home: NextPage = () => {
  const [open, setOpen] = useState(false);
  const [book, setBook] = useState<Book>();
  const { data, error, mutate, isLoading } = useSWR<Book[]>(
    "/api/books",
    fetcher
  );
  if (error) return <div>Error</div>;
  if (isLoading) return <div>Loading ...</div>;

  const editBook = (book: Book) => {
    setBook(book);
    setOpen(true);
  };

  function closeAndMutate() {
    mutate();
    setOpen(false);
  }

  return (
    <div className="flex min-h-screen flex-col items-center py-4">
      <Head>
        <title>Book list</title>
      </Head>
      <h1 className="text-3xl font-semibold text-gray-50">Book list</h1>
      <div className="p-4"></div>
      <div className="flex flex-col w-3/6">
        {data &&
          data.map((book) => (
            <BookListItem
              key={book.entityId}
              editBook={() => editBook(book)}
              book={book}
            ></BookListItem>
          ))}
        {data?.length === 0 && (
          <button
            onClick={() => editBook({ author: "", description: "", title: "" })}
          >
            Add book
          </button>
        )}
      </div>
      <Drawer open={open} onClose={() => setOpen(false)}>
        {book && (
          <BookForm book={book} onChange={() => closeAndMutate()}></BookForm>
        )}
      </Drawer>
    </div>
  );
};

export default Home;
