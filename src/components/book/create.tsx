
import { Book } from "./book";
import { BookController, bookDescriptor } from "./book_controller";

export function createBook() {
  const book = bookDescriptor.create({
    opened: false,
    pages: undefined,
  })
  const controller = new BookController(book);

  const Component = (props: { onClickCover: () => void }) =>
    <Book opened={book.opened} pages={book.pages} onClickCover={props.onClickCover} />;

  return {
    Component,
    controller,
  };
}