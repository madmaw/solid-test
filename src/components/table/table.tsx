import { Component } from "solid-js";
import styles from './table.module.scss';
import { View } from "./table_controller";

export function TableComponent(props: { Book: Component, view: View }) {
    return (
        <div class={styles.container}>
            <div classList={{
                [styles.board]: true,
            }}>
                <div classList={{
                    [styles.table]: true,
                    [styles.tilted]: props.view === View.Tilted,
                    [styles.topDown]: props.view === View.TopDown,
                    [styles.topDownBookCentered]: props.view === View.TopDownBookCentered,
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
