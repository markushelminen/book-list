import { useState } from "react";
import { Book } from "../pages/index";

export default function bookForm({ book }: { book: Book }) {
  const [newBook, setBook] = useState<Book>(book);

  const btn =
    "bg-blue-500 shadow-s hover:bg-blue-700 font-bold py-2 px-4 my-2 rounded";
  const addBook = async () => {
    console.log("New Book");
    const res = await fetch("/api/books", {
      body: JSON.stringify(newBook),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });

    const result = await res.json();
    console.log(result);
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
  };

  return (
    <div className="bg-gray-400">
      <h2 className="text-xl text-gray-50">Book</h2>
      <div className="flex flex-col p-4">
        <div className="">
          <label>Title</label>
          <input
            className="text-gray-800"
            type="text"
            name="title"
            value={newBook.title}
            onChange={(e) => {
              setBook({ ...newBook, title: e.currentTarget.value });
            }}
          />
        </div>
        <div className="p-2"></div>
        <div className="">
          <label>Author</label>
          <input
            className="text-gray-800"
            type="text"
            name="author"
            value={newBook.author}
            onChange={(e) => {
              setBook({ ...newBook, author: e.currentTarget.value });
            }}
          />
        </div>
        <div className="p-2"></div>
        <div className="">
          <label>Description</label>
          <textarea
            className="text-gray-800"
            name="description"
            value={newBook.description}
            onChange={(e) => {
              setBook({ ...newBook, description: e.currentTarget.value });
            }}
          ></textarea>
        </div>
        <div className="p-2"></div>
        <div className="flex">
          <button className={btn} onClick={addBook}>
            Save New
          </button>
          <button className={btn} onClick={updateBook}>
            Save
          </button>
          <button className={btn} onClick={deleteBook}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
