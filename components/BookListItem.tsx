import { Book } from "../pages";

interface BookListItemProps {
  book: Book;
  editBook: Function;
}

export default function BookListItem({ book, editBook }: BookListItemProps) {
  const { title, author, description } = book;
  return (
    <>
      <div
        className="cursor-pointer p-6 w-full mx-auto bg-slate-600 rounded-md justify-center items-center my-4"
        onClick={() => editBook()}
      >
        <div className="grid gap-2 md:grid-cols-8 md:grid-rows-1">
          <h2
            className="font-medium text-xl pb-2 md:col-start-1 md:col-end-7"
            id="title"
          >
            {title}
          </h2>
          <i className="md:col-start-7 md:col-end-9 md:mt-1">{author}</i>
        </div>
        {/* <div className="grid grid-cols-1 gap-2 md:grid-cols-6">
          <label className="font-medium md:col-span-1">Author</label>
          <h5 id="author" className="md:col-start-2 md:col-end-7">
            {author}
          </h5>

          <label className="font-medium md:col-start-1">Description</label>
          <p id="description" className="md:col-start-2 md:col-end-7">
            {description}
          </p>
        </div> */}
      </div>
    </>
  );
}
