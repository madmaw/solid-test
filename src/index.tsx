import { createEffect, createSignal, onCleanup } from "solid-js";
import { render } from "solid-js/web";
import { Game } from "./model/domain";
import { createHome } from "./pages/home/create";
import { createPlay } from "./pages/play/create";

window.onload = function() {
    function launchGame(game: Game) {
        const TopLevelComponent = function() {
            return <Play game={game}/>;
        };
        // solid gets confused because a component is a function
        appSetter(() => TopLevelComponent);
    };
    const Home = createHome({ launchGame });
    const Play = createPlay();

    const [appAccessor, appSetter] = createSignal(Home);
    const app = document.getElementById('app')!;
    createEffect(() => {
        const cleanUp = render(appAccessor(), app);
        onCleanup(cleanUp);
    });
};
