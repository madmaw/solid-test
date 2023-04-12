import { onCleanup, onMount } from "solid-js";
import { Game, gameDescriptor } from "model/domain";
import { MainMenu } from "./main_menu";

export function createHome({ launchGame }: { launchGame: (game: Game) => void }) {
  return function () {
    onMount(() => {
      console.log('home mounted');
      onCleanup(() => console.log('home cleaned up'));
    });
    const newGame = () => launchGame(gameDescriptor.create({
      creationTimestamp: Date.now(),
      lastUpdatedTimestamp: Date.now(),
    }));
    return <MainMenu newGame={newGame} />
  };
}
