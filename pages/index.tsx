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

  const editBook = (book: Book) => {
    setBook(book);
    setOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col items-center py-4">
      <Head>
        <title>Book list</title>
      </Head>
      <h1 className="text-3xl font-semibold text-gray-50">Book list</h1>
      <div className="p-4"></div>
      <div className="flex flex-col ">
        {data &&
          data.map((book) => <Book key={book.entityId} book={book}></Book>)}
        {data?.length === 0 && (
          <button
            onClick={() => editBook({ author: "", description: "", title: "" })}
          >
            Add book
          </button>
        )}
      </div>
      <Drawer open={open} onClose={() => setOpen(false)}>
        {book && <BookForm book={book}></BookForm>}
      </Drawer>
    </div>
  );

  function Book({ book }: { book: Book }) {
    const { title, author, description } = book;
    return (
      <>
        <div
          className="cursor-pointer p-6 w-3/4 mx-auto bg-slate-600 rounded-md items-center my-4"
          onClick={() => editBook(book)}
        >
          <h2 className="font-medium text-xl pb-2" id="title">
            {title}
          </h2>
          <div className="flex">
            <div className="flex flex-col pr-4">
              <label>Author</label>
              <label>Description</label>
            </div>
            <div className="flex flex-col">
              <h5 id="author">{author}</h5>
              <p id="description">{description}</p>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Home;
