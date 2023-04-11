import styles from './main_menu.module.scss';

export function MainMenu(props: {
  newGame: () => void,
}) {
  return (
    <div classList={{
      [styles.menu]: true,
    }}>
      Main Menu
    </div>
  );
}