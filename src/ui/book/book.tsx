import * as styles from './book.module.css';
import { children, For, ParentProps } from 'solid-js';

type BookProps = ParentProps<{}>;

export function Book(props: BookProps) {
    return (
        <div class={styles.container}>
            <For each={children(() => props.children).toArray()}>
                {(child) => (
                    <div class={styles.page}>
                        {child}
                    </div>
                )}
            </For>
        </div>
    );
}
