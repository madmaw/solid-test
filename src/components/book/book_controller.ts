import { booleanDescriptor } from "model/descriptor/literals";
import { activeRecordDescriptor } from "model/descriptor/record";

export const bookDescriptor = activeRecordDescriptor({
  open: booleanDescriptor,
});

export type Book = typeof bookDescriptor.aMutable;
export type BookState = typeof bookDescriptor.aState;

export class BookController {
  constructor(private readonly book: Book) {}

  setOpen(open: boolean) {
    this.book.open = open;
  }
}
