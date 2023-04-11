import { boardHeight, boardWidth } from "ui/board/board.constants";
import { Scene } from "./scene";


export function createScene() {
    return function () {
        return (
            <Scene props={"ABCD".split('').map(letter => {
                return {
                    letter,
                    x: Math.random() * boardWidth - boardWidth/2,
                    y: Math.random() * boardHeight - boardHeight/2,
                }
            })}/>
        );
    }
}