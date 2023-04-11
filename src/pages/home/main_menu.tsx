import styles from './main_menu.module.scss';
import { Book } from '../../view/book';

export function MainMenu(props: {
    newGame: () => void,
}) {
    return (
        <div classList={{
            [styles.menu]: true,
        }}>
            <Book />
            {/* <button classList={{
                [styles.button]: true,
            }} onClick={props.newGame}>New Game</button> */}
        </div>
    );
}