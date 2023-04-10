import { Component } from "solid-js";
import * as styles from './board.module.css';

export function Board(props: { Book: Component }) {
    return (
        <svg width="100%" height="100%" viewBox="-100 -100 200 200" preserveAspectRatio="xMinYMin">
            <g class={styles.table}>
                <g class={styles.book}>
                    <props.Book/>
                </g>
            </g>
        </svg>
    );
}
