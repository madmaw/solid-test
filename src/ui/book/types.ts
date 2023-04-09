import { Component } from "solid-js";
import { SkippablePromise } from "../../base/skippable_promise";

export type PagePair = {
    Left: Component,
    Right: Component,
    popup(): SkippablePromise<void>,
    popdown(): SkippablePromise<void>,
};

export interface BookController {
    // adds the next page
    next(pages: PagePair): SkippablePromise<void>,
    // moves back to this page
    previous(pages: PagePair): SkippablePromise<void>,
}

