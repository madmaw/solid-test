import { MainMenu } from "./main_menu";

export function createHome({

}: {

}) {
    const newGame = () => console.log('new game');
    return () => {
        return <MainMenu newGame={newGame}/>
    };
}
