import styles from './main_menu.module.css';

export function MainMenu(props: {
    newGame: () => void,
}) {
    return (
        <div>
            <button classList={{
                [styles.button]: true,
            }} onClick={props.newGame}>New Game</button>
        </div>
    );
}