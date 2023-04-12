import { Cutout } from 'components/book/cutout';
import styles from './main_menu.module.scss';

export function MainMenu(props: {
  startGame: () => void
}) {
  return (
    <div class={styles.menu}>
      <Cutout><h1>GRAND TERMINUS</h1></Cutout>
      <Cutout><button onClick={props.startGame}><h2>Begin Origin</h2></button></Cutout>
    </div >
  );
}