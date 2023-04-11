import styles from './book.module.scss';
import { children, For, ParentProps } from 'solid-js';

export const enum PageAnimation {
    LeftToRight = 'ltr',
    RightToLeft = 'rtl',
};

type BookProps = ParentProps<{
    pageAnimation: PageAnimation, 
    onPageAnimationComplete: () => void,
} | {
    pageAnimation: undefined,
}>;

export function Book(props: BookProps) {
    return (
        <For each={children(() => props.children).toArray()}>
            {child => child && (
                <g classList={{
                    [styles.page]: true,
                    [props.pageAnimation || styles.none]: props.pageAnimation != null
                }}>
                    <rect class={styles.paper}/>
                    {child}
                </g>
            )}
        </For>
    );
}
