import Drawer from "@mui/material/Drawer";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";
import BookForm from "../components/BookForm";

interface Data {
  data: Book[];
}
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
  const { data, error, isLoading } = useSWR<Book[]>("/api/books", fetcher);
  if (error) return <div>Error</div>;
  if (isLoading) return <div>Loading ...</div>;
  if (data) console.log(data);

  const editBook = (book: Book) => {
    setBook(book);
    setOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col items-center py-2">
      <Head>
        <title>Book list</title>
      </Head>
      <h1 className="text-2xl text-gray-50">Book list</h1>
      <div className="p-8"></div>
      <div className="flex p-6 max-w-2xl mx-auto bg-slate-600 rounded-xl shadow-md items-center space-x-4">
        {data &&
          data.map((book) => <Book key={book.entityId} book={book}></Book>)}
      </div>
      <Drawer open={open} onClose={() => setOpen(false)}>
        {book && <BookForm book={book}></BookForm>}
      </Drawer>
    </div>
  );

  function Book({ book }: { book: Book }) {
    const { title, author } = book;
    return (
      <>
        <div className="cursor-pointer" onClick={() => editBook(book)}>
          <h2 id="title">{title}</h2>
          <h5 id="author">{author}</h5>
        </div>
      </>
    );
  }
};

export default Home;
