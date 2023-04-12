import { MainMenu } from "./main_menu";

export function createMainMenu() {
  const Component = (props: { startGame: () => void }) =>
    <MainMenu startGame={props.startGame} />;
  return {
    Component
  };
}
