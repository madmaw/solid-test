import { Component, onCleanup, onMount } from "solid-js";
import { Game } from "../../model/domain";

type PlayProps = {
    game: Game,
};

export function createPlay(): Component<PlayProps> {
    return function(props: PlayProps) {
        onMount(() => {
            const handle = setInterval(() => props.game.lastUpdatedTimestamp[1](Date.now()), 1000);
        });
        onCleanup(() => {
            console.log('cleaning up');
            //clearInterval(handle);
        });
        return (
            <div>{props.game.creationTimestamp} - {props.game.lastUpdatedTimestamp[0]()}</div>
        );
    };
}