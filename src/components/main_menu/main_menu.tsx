import { Cutout } from 'components/book/cutout';
import styles from './main_menu.module.scss';

export function MainMenu() {
  return (
    <div classList={{
      [styles.menu]: true,
    }}>
      <Cutout><h1>GRAND TERMINUS</h1></Cutout>
    </div>
  );
}