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
        <For each={props.props}>{prop => (
            <span
                    class={styles.prop}
                    style={{
                        'transform-origin': `${prop.x}% ${prop.y}%`,
                        top: `${prop.y}%`,
                        left: `${prop.x}%`,
                        'animation-delay': '1s',
                    }}
                    >{prop.letter}</span>
                    
        )}</For>
    );
}