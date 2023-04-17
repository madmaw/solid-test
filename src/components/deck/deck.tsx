import { For, ParentProps, children } from "solid-js";
import styles from './deck.module.scss';

export function DeckComponent(props: ParentProps<{}>) {
  return (
    <div class={styles.deck}>
      <For each={children(() => props.children).toArray()}>
        {
          child => (
            <div class={styles.card}>{child}</div>
          )
        }
      </For>
    </div>
  );
}
