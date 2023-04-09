import { Component } from "solid-js";
import { newSkippablePromise } from "base/skippable_promise";
import { booleanDescriptor, componentDescriptor } from "model/descriptor/literals";
import { optionalDescriptor } from "model/descriptor/option";
import { activeRecordDescriptor, valueRecordDescriptor } from "model/descriptor/record";
import { BookController, PagePair } from "./types";

const pagePairDescriptor = valueRecordDescriptor({
    Left: componentDescriptor,
    Right: componentDescriptor,

})

const bookDescriptor = activeRecordDescriptor({
    currentPage: optionalDescriptor(pagePairDescriptor),
    previousPage: optionalDescriptor(pagePairDescriptor),
    turnRight: booleanDescriptor,
});

export function createBook(): {
    controller: BookController,
    Component: Component,
} {
    const book = bookDescriptor.create({
        currentPage: undefined,
        previousPage: undefined,
        turnRight: true,
    });

    function Component() {
        return <div>Book</div>;
    };
    return {
        controller: {
            next: function(page: PagePair) {
                return newSkippablePromise(resolve => {
                    resolve();
                });
            },
            previous: function(page: PagePair) {
                return newSkippablePromise(resolve => {
                    resolve();
                });
            },
        },
        Component,
    }    
}
