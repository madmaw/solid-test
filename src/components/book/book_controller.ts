// import { SkippablePromise } from "base/skippable_promise";
import { LiteralTypeDescriptor, booleanDescriptor } from "model/descriptor/literals";
import { optionalDescriptor } from "model/descriptor/option";
import { activeRecordDescriptor } from "model/descriptor/record";
import { Component } from "solid-js";

export type PagePair = {
  readonly Left: Component,
  readonly Right: Component,
  // popup(): SkippablePromise<void>,
  // popdown(): SkippablePromise<void>,
};

export const bookDescriptor = activeRecordDescriptor({
  opened: booleanDescriptor,
  pages: optionalDescriptor(new LiteralTypeDescriptor<PagePair>),
});

export type Book = typeof bookDescriptor.aMutable;
export type BookState = typeof bookDescriptor.aState;

export class BookController {
  constructor(private readonly book: Book) { }

  open() {
    this.book.opened = true;
  }

  close() {
    this.book.opened = false;
  }

  showPages(pages: PagePair) {
    if (!this.book.opened) {
      this.open();
    }
    this.book.pages = pages;
  }
}
