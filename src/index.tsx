import { createEffect, createSignal } from "solid-js";
import { render } from "solid-js/web";
import { Game } from "./model/domain";
import { createHome } from "./pages/home/create";
import { createPlay } from "./pages/play/create";

window.onload = function() {
    function launchGame(game: Game) {
        const TopLevelComponent = function() {
            return <PlayComponent game={game}/>;
        };
        topLevelElementSetter(<TopLevelComponent/>);
        setTimeout(() => {
            topLevelElementSetter(<HomeComponent/>);
        }, 5000);
    };
    const HomeComponent = createHome({ launchGame });
    const PlayComponent = createPlay();
    const [topLevelElementAccessor, topLevelElementSetter] = createSignal(<HomeComponent/>);
    const app = document.getElementById('app')!;
    render(() => <>{topLevelElementAccessor()}</>, app);
};
