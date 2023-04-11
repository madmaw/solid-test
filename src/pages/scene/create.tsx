import { Scene } from "./scene";


export function createScene() {
    return function () {
        return (
            <Scene props={[..."ABCDEFGHIJKL😂"].map(letter => {
                return {
                    letter,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                }
            })}/>
        );
    }
}