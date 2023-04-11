import { Component } from "solid-js";
import styles from './board.module.scss';

export function Board(props: { Book: Component, flat: boolean }) {
    return (
        <div class={styles.container}>
            <div classList={{
                [styles.board]: true,
            }}>
                <div classList={{
                    [styles.table]: true,
                    [styles.flat]: props.flat,
                }}>
                    <div
                        class={styles["table-top"]}/>
                    <div class={styles.book}>
                        <props.Book/>
                    </div>
                </div>
            </div>

        </div>
    );
}
