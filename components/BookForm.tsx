import { useState } from "react";
import { Book } from "../pages/index";

interface bookFormProps {
  book: Book;
  onChange: Function;
}

export default function bookForm({ book, onChange }: bookFormProps) {
  const [newBook, setBook] = useState<Book>(book);

  const btn =
    "bg-gray-50 shadow-s text-gray-800 hover:bg-gray-200 font-semibold py-2 px-4 my-2 rounded";
  const addBook = async () => {
    const res = await fetch("/api/books", {
      body: JSON.stringify(newBook),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });

    const result = await res.json();
    console.log(result);
    onChange();
  };

  const updateBook = async () => {
    //setCreateLoading = true
    const res = await fetch(`api/books/${newBook.entityId}`, {
      body: JSON.stringify(newBook),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();
    console.log(result);
    onChange();
  };

  const deleteBook = async () => {
    const res = await fetch(`api/books/${newBook.entityId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
    const result = await res.json();
    console.log(result);
    onChange();
  };

  return (
    <div className="bg-slate-600 h-full sm:w-[32rem] lg:w-[48rem] text-gray-50">
      <h2 className="text-2xl text-gray-50 text-center pt-4">Book</h2>
      <div className="flex flex-col p-4">
        <div className="flex flex-col">
          <label className="">Title</label>
          <input
            className=" bg-gray-800 rounded-md p-2"
            type="text"
            name="title"
            value={newBook.title}
            onChange={(e) => {
              setBook({ ...newBook, title: e.currentTarget.value });
            }}
          />
        </div>
        <div className="p-2"></div>
        <div className="flex flex-col">
          <label>Author</label>
          <input
            className="bg-gray-800 rounded-md p-2"
            type="text"
            name="author"
            value={newBook.author}
            onChange={(e) => {
              setBook({ ...newBook, author: e.currentTarget.value });
            }}
          />
        </div>
        <div className="p-2"></div>
        <div className="flex flex-col">
          <label>Description</label>
          <textarea
            className="h-96 bg-gray-800 rounded-md p-2 overflow-y-auto"
            name="description"
            value={newBook.description}
            onChange={(e) => {
              setBook({ ...newBook, description: e.currentTarget.value });
            }}
          ></textarea>
        </div>
        <div className="p-2"></div>
        <div className="flex justify-end">
          <button className={btn} onClick={addBook}>
            Save New
          </button>
          {newBook.entityId && (
            <>
              <div className="px-2"></div>
              <button className={btn} onClick={updateBook}>
                Save
              </button>
            </>
          )}
          {newBook.entityId && (
            <>
              <div className="px-2"></div>
              <button
                className={`${btn} bg-red-300 hover:bg-red-400`}
                onClick={deleteBook}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
