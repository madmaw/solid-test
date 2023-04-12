import { Book } from "./book";
import { BookController, bookDescriptor } from "./book_controller";

export function createBook() {

  const book = bookDescriptor.create({
    open: false,
  });

  const controller = new BookController(book);

  function Component(props: { onRequestOpenBook: () => void }) {
    return <Book open={book.open} onClickCover={props.onRequestOpenBook}/>;
  };

  return {
    Component,
    controller,
  };
}
