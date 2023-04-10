import { Component } from "solid-js";
import { newSkippablePromise } from "base/skippable_promise";
import { componentDescriptor } from "model/descriptor/literals";
import { optionalDescriptor } from "model/descriptor/option";
import { activeRecordDescriptor, valueRecordDescriptor } from "model/descriptor/record";
import { BookController, PagePair } from "./types";
import { Book, PageAnimation } from "./book";

const pagePairDescriptor = valueRecordDescriptor({
    Left: componentDescriptor,
    Right: componentDescriptor,
});

const bookDescriptor = activeRecordDescriptor({
    currentPage: pagePairDescriptor,
    previousPage: optionalDescriptor(pagePairDescriptor),
});

function onPageAnimationComplete() {

};

export function createBook({ initialPage }: { initialPage: PagePair }): {
    controller: BookController,
    Component: Component,
} {
    const book = bookDescriptor.create({
        currentPage: initialPage,
        previousPage: undefined,
    });

    function Component() {
        return (
            <Book
                    pageAnimation={PageAnimation.LeftToRight}
                    onPageAnimationComplete={onPageAnimationComplete}>
                {book.previousPage && (
                    <>
                        <book.previousPage.Left/>
                        <book.previousPage.Right/>
                    </>
                )}
                <book.currentPage.Left/>
                <book.currentPage.Right/>
            </Book>
        );
    };
    return {
        controller: {
            next: function(page: PagePair) {
                return newSkippablePromise(resolve => {
                    book.previousPage = book.previousPage;
                    book.currentPage = page;    
                    resolve();
                });
            },
            previous: function(page: PagePair) {
                return newSkippablePromise(resolve => {
                    book.previousPage = book.previousPage;
                    book.currentPage = page;
                    resolve();
                });
            },
        },
        Component,
    }    
}
