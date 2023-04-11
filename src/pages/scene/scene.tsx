import { For } from "solid-js";
import styles from './scene.module.scss';

type Prop = {
    letter: string,
    x: number,
    y: number,
}

export function Scene(props: {
    props: readonly Prop[],
}) {
    return (
        <g>
            <For each={props.props}>{prop => (
                <text
                        class={styles.prop}
                        x={prop.x}
                        y={prop.y}
                        style={{
                            'transform-origin': `${prop.x}px ${prop.y}px`
                        }}
                        >{prop.letter}</text>
                        
            )}</For>
        </g>
    );
}