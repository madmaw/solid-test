import { createEmpty } from "pages/empty/create";
import { render } from "solid-js/web";
import { createBook } from "ui/book/create";
import { Game } from "model/domain";
import { createHome } from "pages/home/create";
import { createPlay } from "pages/play/create";
import { newSkippablePromise } from "base/skippable_promise";
import { Board } from "ui/board/board";
import { createScene } from "pages/scene/create";
import { createSignal } from "solid-js";

window.onload = function() {
    function launchGame(game: Game) {
        const TopLevelComponent = function() {
            return <Play game={game}/>;
        };
        bookController.next({
            Left: Home,
            Right: TopLevelComponent,
            popdown: () => newSkippablePromise(resolve => resolve),
            popup: () => newSkippablePromise(resolve => resolve),
        });
    };
    const Empty = createEmpty();
    const Scene = createScene();
    const Home = createHome({ launchGame });
    const Play = createPlay();
    const { Component: Book, controller: bookController } = createBook({
        initialPage: {
            Left: Scene,
            Right: Empty,
            popdown: () => newSkippablePromise(resolve => resolve),
            popup: () => newSkippablePromise(resolve => resolve),
        }
    });
    const app = document.getElementById('app')!;
    const [flat, setFlat] = createSignal(false);
    render(() => <Board Book={Scene} flat={flat()}/>, app);
    setTimeout(() => {
        setFlat(true);
    }, 1000);
};
