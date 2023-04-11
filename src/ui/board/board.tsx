import { Component } from "solid-js";
import styles from './board.module.scss';
import { boardHeight, boardWidth } from "./board.constants";

export function Board(props: { Book: Component }) {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox={`${-boardWidth/2} ${-boardHeight/2} ${boardWidth} ${boardHeight}`}
            preserveAspectRatio="xMidYMid meet">
            <g class={styles.board}>
                <g class={styles.table}>
                    <rect
                        x={-boardWidth/2}
                        y={-boardHeight/2}
                        class={styles["table-top"]}/>
                    <g class={styles.book}>
                        <props.Book/>
                    </g>
                </g>

            </g>
        </svg>
    );
}
